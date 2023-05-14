const createError = require("http-errors");

const { Book } = require("../models");
const validators = require("../validators");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("user").populate("category");
    res.json(books);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const createBook = async (req, res, next) => {
  try {
    const { error } = validators.bookValidator.validate(req.body);

    if (error) {
      const reqError = createError(400, error.details[0].message);
      return next(reqError);
    }

    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("user")
      .populate("category");

    if (!book) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(book);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { error } = validators.bookValidator.validate(req.body);

    if (error) {
      const reqError = createError(400, error.details[0].message);
      return next(reqError);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(book);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    console.log(book);

    if (!book) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(book);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
