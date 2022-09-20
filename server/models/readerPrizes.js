const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prizeSchema = mongoose.Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    image_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('ReaderPrize', prizeSchema);