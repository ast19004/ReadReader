const express = require('express');
const { body } = require("express-validator");

const readerPrizesController = require('../../controllers/reader/readerPrize');
const isAuth = require('../../middleware/isAuth');

const router = express.Router();

const readerPrizeValidation = [
    body('reading_requirement')
    .isInt()
];

router.get('/reader/:readerId/prizes/available', isAuth, readerPrizesController.getAvailableReaderPrizes);
router.get('/reader/:readerId/prizes/earned', isAuth, readerPrizesController.getEarnedReaderPrizes);
router.get('/prizes/', isAuth, readerPrizesController.getAllReaderPrizes);
router.post('/prize/', readerPrizeValidation, isAuth, readerPrizesController.postReaderPrize);
router.get('/prize/:prizeId', isAuth, readerPrizesController.getReaderPrize);
router.put('/prize/:prizeId', readerPrizeValidation, isAuth, readerPrizesController.putReaderPrize);
router.delete('/prize/:prizeId', isAuth, readerPrizesController.deleteReaderPrize);

module.exports = router;