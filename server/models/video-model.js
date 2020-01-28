const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    videoId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongsoose.model("video", videoSchema);
