const { validationResult } = require('express-validator');

const ReaderPrize = require('../../models/readerPrize');
const Reader = require('../../models/reader');

/** Return all reader prizes associated with a specific reader **/
exports.getAllReaderPrizes = async (req, res, next) => { };

/** Add a created ReaderPrize to the reader prizes database **/
 exports.postReaderPrize = async (req, res, next) => {
    const prizeName = req.body['prize_name'];
    const readingRequirement = req.body['reading_requirement'];
    const readers = req.body['readers'];

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(422).json({
    //         errorMessage : errors.array()[0],
    //         validationErrors: errors.array()
    //     });
    // }

    const newPrize = new ReaderPrize({
        'prize_name' : prizeName,
        'reading_requirement': readingRequirement,
        'readers' : readers
    });
    try{
    const savedPrize= await newPrize.save();
        res.status(201).json({message: "User Added Successfully.", newPrize: savedPrize});
    }catch{err => {
        const error = new Error(err);
        if(!err.statusCode){
            error.statusCode = 500;
        }
        return next(error);
    }};



 };

 /** Add an existing ReaderPrize to a reader **/
 exports.postPrizeToReader = async (req, res, next) => {};

 /** Return a prize by id **/
exports.getReaderPrize = async (req, res, next) => {};

/** Edit a reader prize in the Reader Prize database **/
exports.putReaderPrize = async (req, res, next) => {};

/** Delete a reader prize from Reader Prize database **/
 exports.deleteReaderPrize = async (req, res, next) => {};

 /** Delete a reader prize from the reader prize list of a specified reader **/
 exports.deleteReaderPrizeFromReader = async (req, res, next) => {};




