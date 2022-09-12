const mongoose = require('mongoose');

const readingSessionSchema = mongoose.Schema({
    reader_id : {
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
    session_date: {
        type: DateTime,
        required: true
    }
});

module.exports = mongoose.model('ReaderSession', readerSessionSchema);
 