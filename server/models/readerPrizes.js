const mongoose = require('mongoose');

const prizeSchema = mongoose.Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
    },
    image_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('ReaderPrize', prizeSchema);