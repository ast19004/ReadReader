const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.postSignup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmedPassword = req.body.confirmPassword;

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                firstName : firstName,
                lastName : lastName,
                email: email,
                password: hashedPassword,
                readers: []
            });
            return user.save();
        })
        .then( result => {
            res.status(201).json({message: "User Added Successfully."});
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postLogin = (req, res, next) => {
    const email = req.email;
    const password = req.password;

    User.findOne({email: email})
    .then((user) => {
        if(user){
            bcrypt.compare(password, user.password)
            .then((result) => {
                if(result){
                    const token = jwt.sign(
                        {
                            userId: user._id.toString(),
                            email: user.email
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: "1h"}
                    );
                    res.status(200).json({
                        message: "Successfully Logged In",
                        userId: user._id.toString(),
                        token: token,
                    });
                } else{
                    res.status(400).json({ message: "Invalid User Information"})
                }
            });
        } else{
            res.status(404).json({
                message: "User not found"
            });
        }
    })
    .catch( (err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(err);
    });
}