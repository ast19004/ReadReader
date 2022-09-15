const { json } = require('express');
const { validationResult } = require('express-validator');

const Reader = require('../models/reader');
const User = require('../models/user');

/** Return all readers associated with logged in user **/
exports.getAllReaders = async (req, res, next) => {
    const user = await User.findById(req.userId);

    const readerIds = user.readers.map(recipe => recipe.readerId);

    const readers = await Reader.find({'_id' : {$in : readerIds}});

    res.status(200).json({
        message: "Fetched Readers",
        readers: readers
    })
};

/** Add a created Reader to the reader database 
 * & add reader_id to the logged-in user's readers list **/
exports.postReader = async (req, res, next) => {
    console.log("postReader controller");
    const reader_name = req.body.reader_name;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errorMessage : errors.array()[0],
            validationErrors: errors.array()
        });
    }

    //Find User in User database so reader can be added by reader_id
    const user = await User.findById(req.userId);
    if(!user){
        console.log("User was not found");
        const error = new Error("User not found.");
        error.statusCode = 404;
    }
    //Create new Reader in Reader Database
    const reader = new Reader({
        parent_id: req.userId,
        reader_name : reader_name,
        total_reading_duration: 0,
        reading_coins: 0,
        reader_sessions: [],
        reader_prizes: []
    });

    reader.save()
    .then(result => {
        res.status(200).json({
            message: "Reader Added Successfully.",
            readerId: result._id,
            newReader: reader
        });
        //If Reader is successfully added, add readerId to logged in user's readers list
        user.readers.push({readerId: result._id});
        return user.save();
    })
    .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
    })
};

/** Return a specific reader associated with logged in user **/
exports.getReader = async (req, res, next) => {
    const readerId = req.params.readerId;

    try{

    const reader = await Reader.findById(readerId).where('parent_id')
    .equals(req.userId);

    if(!reader){
        const error = new Error("Reader not found.");
        error.statusCode= 404;
        throw error;
    }

    res.status(200).json({
        message: "Fetched Reader",
        reader: reader
    });
    
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.putReader = (req, res, next) => {};

/** Delete a reader from Reader database and from reader list of logged in user **/
exports.deleteReader = (req, res, next) => {};

