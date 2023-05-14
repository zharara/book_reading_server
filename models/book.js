const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  authors: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookCategory",
    required: true,
  },
  bookInfo: String,
  bookPages: { type: Number, required: true },
  currentReadingPage: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
