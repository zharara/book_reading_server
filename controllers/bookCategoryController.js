const createError = require("http-errors");

const { BookCategory, Book } = require("../models");
const validators = require("../validators");

const getAllBookCategories = async (req, res, next) => {
  try {
    const bookCategories = await BookCategory.find({user: req.user,}).populate("user");
    res.json(bookCategories);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const createBookCategory = async (req, res, next) => {
  try {
    const { error } = validators.bookCategoryValidator.validate(req.body);

    if (error) {
      const reqError = createError(400, error.details[0].message);
      return next(reqError);
    }

    const bookCategory = new BookCategory(req.body);
    await bookCategory.save();
    res.json(bookCategory);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const getBookCategoryById = async (req, res, next) => {
  try {
    const bookCategory = await BookCategory.findById(req.params.id).populate(
      "user"
    );

    if (!bookCategory) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(bookCategory);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const updateBookCategory = async (req, res, next) => {
  try {
    const { error } = validators.bookCategoryValidator.validate(req.body);

    if (error) {
      const reqError = createError(400, error.details[0].message);
      return next(reqError);
    }

    const bookCategory = await BookCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bookCategory) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(bookCategory);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const deleteBookCategory = async (req, res, next) => {
  try {
    const books = await Book.find({ category: req.params.id });
    if (books.length > 0) {
      const reqError = createError(
        400,
        "Cannot delete a category that has books, first delete all books of this category."
      );
      return next(reqError);
    }

    const bookCategory = await BookCategory.findByIdAndDelete(req.params.id);

    if (!bookCategory) {
      const reqError = createError(404, "Not found!");
      return next(reqError);
    }

    res.json(bookCategory);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

module.exports = {
  getAllBookCategories,
  createBookCategory,
  getBookCategoryById,
  updateBookCategory,
  deleteBookCategory,
};
