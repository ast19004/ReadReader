const mongoose = require('mongoose');

const readingSessionSchema = mongoose.Schema({
    child_id : {
        type: Number,
        required: true
    },
    book_title: {
        type: String,
        required: false
    },
    reading_duration: {
        type: Number,
        required: true
    },
    date: {
        type: DateTime,
        required: true
    }
});

module.exports = mongoose.model('ReadingSession', readingSessionSchema);
 