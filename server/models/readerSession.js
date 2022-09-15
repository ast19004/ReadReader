const mongoose = require('mongoose');

const readerSessionSchema = mongoose.Schema({
    reader_id : {
        type: Schema.Types.ObjectId,
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
        type: mongoose.Schema.Date, 
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('ReaderSession', readerSessionSchema);
 