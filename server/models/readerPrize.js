const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prizeSchema = mongoose.Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  prize_name: {
    type: String,
    required: true,
  },
  reading_requirement: {
    type: Number,
    required: true,
  },
  prize_image: {
    type: String,
  },
  readers: [
    {
      readerId: {
        type: Schema.Types.ObjectId,
        ref: "Reader",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("ReaderPrize", prizeSchema);
