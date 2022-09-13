const mongoose = require('mongoose');
const readerSchema = mongoose.Schema({
    parent_id : {
        type: Schema.Types.ObjectId,
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
    },
    reader_sessions: [
        {
          sessionId: {
            type: Schema.Types.ObjectId,
            ref: "Session",
            required: true,
          },
        }
      ],
      reader_prizes : [
        {
            prizeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ReaderPrizes",
                required: true
            }
        }
      ]

});

module.export = mongoose.model('Reader', readerSchema);