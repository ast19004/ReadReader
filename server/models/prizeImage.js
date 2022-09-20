const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = mongoose.Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    image_path: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('PrizeImage', imageSchema);