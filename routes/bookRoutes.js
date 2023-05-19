const express = require("express");
const passport = require("passport");

const { bookController } = require("../controllers");

const router = express.Router();

router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  bookController.getAllBooks
);

router.get(
  "/get-books-of-category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  bookController.getBooksOfCategory
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  bookController.createBook
);

router.get(
  "/get-one/:id",
  passport.authenticate("jwt", { session: false }),
  bookController.getBookById
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  bookController.updateBook
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  bookController.deleteBook
);

module.exports = router;
