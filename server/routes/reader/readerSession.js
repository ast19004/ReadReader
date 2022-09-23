const express = require('express');

const { body } = require('express-validator');

const isAuth = require('../../middleware/isAuth');
const readerSessionController = require('../../controllers/reader/readerSession');

const router = express.Router();

const readerSessionPostValidation = [
    body('book_title').isLength({min: 1}).trim()
];

const readerSessionPutValidation = [
    body('book_title').isLength({min: 1}).trim(),
    body('reading_duration').isNumeric()
];


router.get('/reader/:readerId/sessions', isAuth, readerSessionController.getAllReaderSessions);
router.post('/reader/session', readerSessionPostValidation, isAuth, readerSessionController.postReaderSession);
router.get('/reader/:readerId/session/:sessionId', isAuth, readerSessionController.getReaderSession)
router.put('/reader/session/:sessionId', readerSessionPutValidation, isAuth, readerSessionController.putReaderSession );
router.delete('/reader/:readerId/session/:sessionId', isAuth, readerSessionController.deleteReaderSession);


module.exports = router;