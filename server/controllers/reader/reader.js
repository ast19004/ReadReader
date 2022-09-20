const { validationResult } = require('express-validator');

const Reader = require('../../models/reader');
const User = require('../../models/user');

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
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
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

/** Edit a reader name in Reader database **/
exports.putReader = async (req, res, next) => {
    const readerId = req.params.readerId;
    const updatedName = req.body.reader_name;

    try{
        const reader = await Reader.findById(readerId).where('parent_id')
        .equals(req.userId);

        if(!reader){
            const error = new Error("Reader not found.");
            error.statusCode= 404;
            throw error;
        }

        reader.reader_name = updatedName;
        await reader.save();


        res.status(200).json({
            message: 'Reader name updated',
            updatedReader : reader
        });

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};



/** Delete a reader from Reader database and from reader list of logged in user **/
exports.deleteReader = async (req, res, next) => {
    const paramReaderId = req.params.readerId;

    try{
    
    const user = await User.findById(req.userId);
    if(!user){
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
        }

        const updatedUserReaders = user.readers.filter(reader => reader.readerId.toString() !== paramReaderId.toString());

        user.readers = updatedUserReaders;
        await user.save();

        await Reader.findByIdAndRemove(paramReaderId).where('parent_id')
        .equals(req.userId);

        res.status(200).json({
            message: "Reader deleted from Readers Database and logged-in User Data",
            updatedUser: user
        });

    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

};

