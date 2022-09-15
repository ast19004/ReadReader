const express = require('express');
const { body } = require("express-validator");

const readerController = require('../controllers/reader');
const isAuth = require('../middleware/isAuth');

const User = require('../models/user');

const router = express.Router();

const readerValidation = [
    body('reader_name').isLength({min : 1}).trim(),
];

router.get('/readers', isAuth, readerController.getAllReaders);
router.post('/reader', readerValidation, isAuth, readerController.postReader);
router.get('/reader/:readerId', isAuth, readerController.getReader);
router.put('/reader/:readerId', readerValidation, isAuth, readerController.putReader);
router.delete('/reader/:readerId', isAuth, readerController.deleteReader);

module.exports = router;