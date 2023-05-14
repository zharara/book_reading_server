const authRouter = require("./authRoutes");
const bookRouter = require("./bookRoutes");
const bookCategoryRouter = require("./bookCategoryRoutes");

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    res.status(200).json({
      status: true,
      message: null,
    });
  });

  app.use("/api/auth", authRouter);

  app.use("/api/books", bookRouter);

  app.use("/api/book-categories", bookCategoryRouter);
};
