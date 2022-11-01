const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        readers: [],
      });
      return user.save();
    })
    .then((savedUserData) => {
      res
        .status(201)
        .json({ message: "User Added Successfully.", user: savedUserData });
    })
    .catch((err) => {
      const error = new Error(err);
      if (!err.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errorMessage: errors.array()[0].errorMessage,
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const readerIds = user.readers.map((reader) =>
              reader.readerId.toString()
            );
            const token = jwt.sign(
              {
                userId: user._id.toString(),
                readerIds: readerIds,
              },
              process.env.JWT_SECRET,
              { expiresIn: "4h" }
            );
            res.status(200).json({
              message: "Successfully Logged In",
              userId: user._id.toString(),
              token: token,
            });
          } else {
            res.status(400).json({ message: "Invalid User Information" });
          }
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(err);
    });
};
