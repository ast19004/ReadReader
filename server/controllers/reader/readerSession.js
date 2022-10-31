const { validationResult } = require("express-validator");

const ReaderSession = require("../../models/readerSession");
const Reader = require("../../models/reader");
const reader = require("../../models/reader");

/** Return all reader sessions associated with a specific reader **/
exports.getAllReaderSessions = async (req, res, next) => {
  const readerId = req.params.readerId;

  const userReaderIds = req.userReaderIds;

  throwErrIfNotAuthorized(userReaderIds, readerId);

  const reader = await Reader.findById(readerId);

  if (!reader) {
    const error = new Error("Reader not found.");
    error.statusCode = 404;
    throw error;
  }

  //map all sessionId and find the corresponsing sessions in the ReaderSession collection
  const readerSessionIds = reader["reader_sessions"].map(
    (session) => session.sessionId
  );

  const readerSessions = await ReaderSession.find({
    _id: { $in: readerSessionIds },
  });

  if (!readerSessions) {
    res.status(404).json({
      message: "No reader sessions found for this reader.",
    });
  }

  res.status(200).json({
    message: "Fetched Reader Sessions",
    sessions: readerSessions,
  });
};

/** Add a created ReaderSession to the reader sessions database
 * & add readerSession_id to specified reader's session list **/
exports.postReaderSession = async (req, res, next) => {
  const readerId = req.body.reader_id;
  const readingDuration = req.body.reading_duration;

  const loggedInUserId = req.userId;

  try {
    const reader = await Reader.findById(readerId)
      .where("parent_id")
      .equals(loggedInUserId);

    if (!reader) {
      const error = new Error("Reader not found");
      error.statusCode = 404;
      throw error;
    }

    //save reader session to reader session database
    const readerSession = new ReaderSession({
      reader_id: readerId,
      reading_duration: readingDuration,
      session_date: new Date().toLocaleDateString(),
    });
    const newReaderSession = await readerSession.save();

    /* session saves successfully to the database ?
           push sessionId to the reader's session list */
    if (newReaderSession) {
      reader["reader_sessions"].push({ sessionId: newReaderSession._id });

      /* Update reader total reading duration & coins */
      reader["total_reading_duration"] += readingDuration;
      reader["reading_coins"] += readingDuration;

      const updatedReader = await reader.save();

      res.status(200).json({
        message: "Reader Session Added Successfully.",
        sessionId: newReaderSession._id,
        readerId: updatedReader._id,
        newReaderSession: newReaderSession,
        updatedReader: updatedReader,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/** Return a reader session by id for a specific reader **/
exports.getReaderSession = async (req, res, next) => {
  const readerId = req.params.readerId;
  const sessionId = req.params.sessionId;

  const userReaderIds = req.userReaderIds;

  throwErrIfNotAuthorized(userReaderIds, readerId);

  const reader = await Reader.find({ readerSessionIds: sessionId }).exec();

  if (!reader) {
    const error = new Error("Reader not found");
    error.statusCode(404);
    throw error;
  }

  const readerSession = await ReaderSession.findById(sessionId);

  if (!readerSession) {
    const error = new Error("Reading Session not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    message: "Reader Session Fetched.",
    readerSession: readerSession,
  });
};

/** Edit a reader session for a specific reader in Reader Session database **/
exports.putReaderSession = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const updatedReaderDate = req.body.session_date;
  const updatedReadingDuration = req.body.reading_duration;

  try {
    const session = await ReaderSession.findById(sessionId);

    if (!session) {
      const error = new Error("Reader Session not found");
      error.statusCode = 404;
      throw error;
    }
    // const userReaderIds = req.userReaderIds;
    const readerId = session.reader_id;
    // throwErrIfNotAuthorized(userReaderIds, readerId);

    session.session_date = updatedReaderDate;
    session.reading_duration = updatedReadingDuration;

    const updatedSession = await session.save();

    const reader = await Reader.findById(readerId);
    reader.total_reading_duration -= session.reading_duration;
    let updatedReaderCoins = reader.reading_coins - session.reading_duration;

    //If removing the session cause negative coins, set to 0
    if (updatedReaderCoins < 0) {
      updatedReaderCoins = 0;
    }

    const updatedReader = await reader.save();

    res.status(200).json({
      message: "Reader Session Updates Successfully.",
      updatedReaderSession: updatedSession,
      updatedReader: updatedReader,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/** Delete a reader session from Reader Session database
 *  & from the reader session list of a specified reader **/
exports.deleteReaderSession = async (req, res, next) => {
  const readerId = req.params.readerId;
  const sessionId = req.params.sessionId;
  const userReaderIds = req.userReaderIds;

  throwErrIfNotAuthorized(userReaderIds, readerId);

  try {
    const reader = await Reader.findById(readerId);
    if (!reader) {
      const error = new Error("Reader not found.");
      error.statusCode = 404;
      throw error;
    }
    //Remove Session from Reader's session history
    const updatedReaderSessions = reader["reader_sessions"].filter(
      (session) => session.sessionId.toString() !== sessionId.toString()
    );
    reader["reader_sessions"] = updatedReaderSessions;

    /* Get duration read from session and 
            remove quantity from Reader's total_duration_read & reading_coins */
    const sessionToDelete = await ReaderSession.findById(sessionId)
      .where("reader_id")
      .equals(readerId);

    const updatedReadingDuration =
      reader["total_reading_duration"] - sessionToDelete["reading_duration"];

    const updatedReaderCoins =
      reader["reading_coins"] - sessionToDelete["reading_duration"];
    //If reader has already used coins associated with session: coins = 0 if coin update = -num
    if (updatedReaderCoins < 0) {
      updatedReaderCoins = 0;
    }

    reader["total_reading_duration"] = updatedReadingDuration;
    reader["reading_coins"] = updatedReaderCoins;

    await reader.save();

    //Remove session from ReaderSession database
    await ReaderSession.findByIdAndRemove(sessionId)
      .where("reader_id")
      .equals(readerId);

    res.status(200).json({
      message:
        "Reader session deleted from Session Database and readers session history.",
      updatedReader: reader,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const throwErrIfNotAuthorized = (userReaderIds, readerId) => {
  //If the logged in user is not associated with this user deny access.
  if (userReaderIds.length === 0) {
    return;
  }
  if (!userReaderIds.includes(readerId)) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
};
