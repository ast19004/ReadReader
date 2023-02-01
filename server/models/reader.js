const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const readerSchema = mongoose.Schema({
  parent_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  theme_color: {
    type: String,
    required: true,
  },
  reader_name: {
    type: String,
    required: true,
  },
  total_reading_duration: {
    type: Number,
    required: true,
  },
  reading_coins: {
    type: Number,
    requied: true,
  },
  reader_sessions: [
    {
      sessionId: {
        type: Schema.Types.ObjectId,
        ref: "ReaderSession",
        required: true,
      },
    },
  ],
  reader_prizes: [
    {
      prizeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReaderPrize",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Reader", readerSchema);
