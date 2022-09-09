const mongoose = require('mongoose');
const readerSchema = mongoose.Schema({
    parent_id : {
        type: Number,
        required: true
    },
    reader_name: {
        type: String,
        required: true
    },
    total_reading_duration: {
        type: Number,
        required: true
    },
    reading_coins: {
        type: Number,
        requied: true
    }

});

module.export = mongoose.model('Reader', readerSchema);