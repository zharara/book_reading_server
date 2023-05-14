const express = require("express");

const config = require("./config");
const middleware = require("./middlewares");
const routes = require("./routes");

const app = express();

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

/**
 * Middlewares
 */
middleware(app);

/**
 * Initialize passport config
 */
config.passportConfig.setConfig();

/**
 * Routes
 */
routes(app);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({
    status: false,
    message: error.message,
  });
});

module.exports = app;
