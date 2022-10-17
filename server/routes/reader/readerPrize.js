const express = require('express');
const { body } = require("express-validator");

const readerPrizesController = require('../../controllers/reader/readerPrize');
const isAuth = require('../../middleware/isAuth');

const router = express.Router();

const readerPrizeValidation = [
    body('reading_requirement').isLength({ min: 5 })
    .isInt()
];

router.get('/reader/:readerId/prizes', isAuth, readerPrizesController.getAllReaderPrizes);
router.post('/reader/prize', readerPrizeValidation, isAuth, readerPrizesController.postReaderPrize);
router.get('/reader/:readerId/prize/:prizeId', isAuth, readerPrizesController.getReaderPrize);
router.put('/reader/:readerId/prize/:prizeId', readerPrizeValidation, isAuth, readerPrizesController.putReaderPrize);
router.delete('/reader/:readerId/prize/:prizeId', isAuth, readerPrizesController.deleteReaderPrize);

module.exports = router;