const { validationResult } = require('express-validator');

const ReaderPrize = require('../../models/readerPrize');
const Reader = require('../../models/reader');

/** Return all reader prizes associated with a specific reader **/
exports.getAllReaderPrizes = async (req, res, next) => { };

/** Add a created ReaderPrize to the reader prizes database **/
 exports.postReaderPrize = async (req, res, next) => {};

 /** Add an existing ReaderPrize to a user associated reader **/
 exports.postReaderPrizeToReader = async (req, res, next) => {};

 /** Return a reader prize by id for a specific reader **/
exports.getReaderPrize = async (req, res, next) => {};

/** Edit a reader prize for a specific reader in Reader Prize database **/
exports.putReaderPrize = async (req, res, next) => {};

/** Delete a reader prize from Reader Prize database **/
 exports.deleteReaderPrize = async (req, res, next) => {};

 /** Delete a reader prize from the reader prize list of a specified reader **/
 exports.deleteReaderPrizeFromReader = async (req, res, next) => {};




