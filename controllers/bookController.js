const createError = require("http-errors");

const { Book } = require("../models");
const validators = require("../validators");

const getAllBooks = async (req, res, next) => {
  var filter = {};

  if (req.query.titleKeyword && req.query.authorsKeyword) {
    filter = {
      $and: [
        {
          title: { $regex: req.query.titleKeyword, $options: "xi" },
        },
        { authors: { $regex: req.query.authorsKeyword, $options: "xi" } },
      ],
    };
  } else if (req.query.titleKeyword) {
    filter = {
      title: { $regex: req.query.titleKeyword, $options: "xi" },
    };
  } else if (req.query.authorsKeyword) {
    filter = { authors: { $regex: req.query.authorsKeyword, $options: "xi" } };
  }

  try {
    console.log(req.user);

    const books = await Book.find({ user: req.user, ...filter })
      .populate("user")
      .populate("category")
      .sort({ timeCreated: "descending" });

    res.json(books);
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

const getBooksOfCategory = async (req, res, next) => {
  try {
    const books = await Book.find({
      user: req.user,
      category: req.params.categoryId,
    })
      .populate("user")
      .populate("category")
      .sort({ timeCreated: "descending" });

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
    })
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
  getBooksOfCategory,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
