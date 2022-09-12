const mongoose = require('mongoose');

const prizeSchema = mongoose.Schema({
    creator_id: {
        type: Number,
        required: true
    },
    image_id: {
        type: Number,
        required: true
    }
});

module.export = mongoose.model('ReaderPrize', prizeSchema);