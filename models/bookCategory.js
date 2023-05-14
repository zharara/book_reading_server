const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema({
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
});

const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

module.exports = BookCategory;
