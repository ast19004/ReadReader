const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


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
}