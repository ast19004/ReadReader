const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prizeSchema = mongoose.Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    prize_name : {
        type: String,
        required: true
    },
    prize_reading_requirement: {
        type: Number,
        required: true
    },
    image_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('ReaderPrize', prizeSchema);