const express = require("express");
const passport = require("passport");

const { bookCategoryController } = require("../controllers");

const router = express.Router();

router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  bookCategoryController.getAllBookCategories
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  bookCategoryController.createBookCategory
);

router.get(
  "/get-one/:id",
  passport.authenticate("jwt", { session: false }),
  bookCategoryController.getBookCategoryById
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  bookCategoryController.updateBookCategory
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  bookCategoryController.deleteBookCategory
);

module.exports = router;
