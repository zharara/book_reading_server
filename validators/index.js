const userValidator = require("./user");
const bookValidator = require("./book");
const bookCategoryValidator = require("./bookCategory");

module.exports = {
  createUserValidator: userValidator.createUserSchema,
  loginValidator: userValidator.loginSchema,
  bookValidator: bookValidator.bookSchema,
  bookCategoryValidator: bookCategoryValidator.categorySchema,
};
