const { validationResult } = require('express-validator');

const ReaderPrize = require('../../models/readerPrize');
const Reader = require('../../models/reader');

/** Return all reader prizes **/
exports.getAllReaderPrizes = async (req, res, next) => { 
    const allPrizes = await ReaderPrize.find({'creator_id' : req.userId});

    res.status(200).json({
        message: "Fetched Prizes",
        prizes: allPrizes
    })
};


/** Return all reader prizes associated with a specific reader **/
exports.getSpecificReaderPrizes = async (req, res, next) => {
    const id = req.params.readerId;
    //Find all prizes that contain readerId in reader list. 
    const allPrizes = ReaderPrize.find();

    res.status(200).json({
        message: "Fetched Prizes",
        prizes: allPrizes
    })
 };

/** Add a created ReaderPrize to the reader prizes database **/
 exports.postReaderPrize = async (req, res, next) => {
    const prizeName = req.body.prize_name;
    const readingRequirement = req.body.reading_requirement;
    const readerIds = req.body.readers;


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(`error: ${errors.array()[0]}`);
        return res.status(400).json({
            errorMessage : errors.array()[0],
            validationErrors: errors.array()
        });
    }

    const newPrize = new ReaderPrize({
        'creator_id': req.userId,
        'prize_name' : prizeName,
        'reading_requirement': readingRequirement,
        'readers': []
    });

    readerIds.forEach(id => newPrize.readers.push({readerId: id}));
    
    try{
    const savedPrize= await newPrize.save();
        res.status(201).json({message: "Reader Prize Added Successfully.", newPrize: savedPrize});
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
exports.putReaderPrize = async (req, res, next) => {
    const prizeId = req.params.prizeId;
    const updatedPrizeName = req.body.prize_name;
    const updatedReadingRequirement = req.body.reading_requirement;
    const updatedReaderIds = req.body.readers.map(id => {return {readerId: id}});

    try{
        const prize = await ReaderPrize.findById(prizeId).where('creator_id')
        .equals(req.userId);

        if(!prize){
            const error = new Error("Prize not found.");
            error.statusCode= 404;
            throw error;
        }

        prize.prize_name = updatedPrizeName;
        prize.reading_requirement = updatedReadingRequirement;
        prize.readers = updatedReaderIds;

        await prize.save();


        res.status(200).json({
            message: 'Prize updated',
            updatedPrize : prize
        });

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

};

/** Delete a reader prize from Reader Prize database **/
 exports.deleteReaderPrize = async (req, res, next) => {};

 /** Delete a reader prize from the reader prize list of a specified reader **/
 exports.deleteReaderPrizeFromReader = async (req, res, next) => {};




