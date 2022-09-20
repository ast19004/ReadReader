const { validationResult } = require('express-validator');

const ReaderSession = require('../../models/readerSession');
const Reader = require('../../models/reader');


/** Return all reader sessions associated with a specific reader **/
 exports.getAllReaderSessions = async (req, res, next) => {
    //readerId gathered from hidden input in body
    const readerId = req.params.readerId;

    const userReaderIds = req.userReaderIds;

    throwErrIfNotAuthorized(userReaderIds, readerId)

    const reader = await Reader.findById(readerId);
    
    if(!reader){
        const error = new Error('Reader not found.');
        error.statusCode = 404; 
        throw error;
    }

    //map all sessionId and find the corresponsing sessions in the ReaderSession collection
    const readerSessionIds = reader['reader_sessions'].map(session => session.sessionId);

    const readerSessions = await ReaderSession.find({'_id' : {$in : readerSessionIds}});

    if(!readerSessions){
        res.status(404).json({
            message: 'No reader sessions found for this reader.'
        });
    }

    res.status(200).json({
        message: 'Fetched Reader Sessions',
        sessions: readerSessions
    });
 };

/** Add a created ReaderSession to the reader sessions database 
 * & add readerSession_id to specified reader's session list **/
exports.postReaderSession = async (req, res, next) => {
    const readerId = req.body.reader_id;
    const bookTitle = req.body.book_title;
    const readingDuration = req.body.reading_duration;

    const loggedInUserId = req.userId;

    try{

        const reader = await Reader.findById(readerId).where('parent_id')
        .equals(loggedInUserId);

        if(!reader){
            const error = new Error("Reader not found");
            error.statusCode = 404;
            throw error;
        }

        //save reader session to reader session database
        const readerSession = new ReaderSession({
            reader_id: readerId,
            book_title: bookTitle,
            reading_duration: readingDuration,
            session_date: new Date().toLocaleDateString(),
        });
        const newReaderSession = await readerSession.save();


        /* session saves successfully to the database ?
           push sessionId to the reader's session list */
        if(newReaderSession){
        reader['reader_sessions'].push({sessionId: newReaderSession._id});

        const updatedReader = await reader.save();


        res.status(200).json({
            message: "Reader Session Added Successfully.",
            sessionId: newReaderSession._id,
            readerId: updatedReader._id,
            newReaderSession: newReaderSession,
            updatedReader: updatedReader
        });
        }

    }catch(err){
        if(!err.statusCode){
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

    const reader = await Reader.find({'readerSessionIds' : sessionId}).exec();

    if(!reader){
        const error = new Error('Reader not found');
        error.statusCode(404);
        throw error;
    }

    const readerSession = await ReaderSession.findById(sessionId);

    if(!readerSession){
        const error = new Error('Reading Session not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: 'Reader Session Fetched.',
        readerSession: readerSession
    });


};


/** Edit a reader session for a specific reader in Reader Session database **/
exports.putReaderSession = async (req, res, next) => {
    const readerId = req.params.readerId;
    const updatedBookTitle = req.body.book_title;
    const updatedReadingDuration = req.body.reading_duration;

    const userReaderIds = req.userReaderIds;

    throwErrIfNotAuthorized(userReaderIds, readerId);

    try{

        const reader = await Reader.findById(readerId);

        if(!reader){
            const error = new Error("Reader not found");
            error.statusCode = 404;
            throw error;
        }

        //save reader session to reader session database
        const readerSession = new ReaderSession({
            reader_id: readerId,
            book_title: bookTitle,
            reading_duration: readingDuration,
            session_date: new Date().toLocaleDateString(),
        });
        const newReaderSession = await readerSession.save();


        /* session saves successfully to the database ?
           push sessionId to the reader's session list */
        if(newReaderSession){
        reader['reader_sessions'].push({sessionId: newReaderSession._id});

        const updatedReader = await reader.save();


        res.status(200).json({
            message: "Reader Session Added Successfully.",
            sessionId: newReaderSession._id,
            readerId: updatedReader._id,
            newReaderSession: newReaderSession,
            updatedReader: updatedReader
        });
        }

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}; 

/** Delete a reader session from Reader Session database
 *  & from the reader session list of a specified reader **/
exports.deleteReader = async (req, res, next) => {
    const readerId = req.body.readerId;
    const userReaderIds = req.userReaderIds;

    throwErrIfNotAuthorized(userReaderIds, readerId);
};




const throwErrIfNotAuthorized = (userReaderIds, readerId) => {
    //If the logged in user is not associated with this user deny access.
    if(!userReaderIds.length != 0){
        return;
    }
    if(!userReaderIds.includes(readerId)){
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }
};