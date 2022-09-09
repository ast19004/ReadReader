const mongoose = require('mongoose');

const prizesSchema = mongoose.Schema({
    creator_id: {
        type: Number,
        required: true
    },
    reading_requirement: {
        type: Number,
        required: true
    },
    image_id: {
        type: Number,
        required: true
    }
});

module.export = mongoose.model('ReadinPrizes', prizesSchema);