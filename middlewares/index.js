const express = require("express");
const passport = require("passport");

module.exports = (app) => {
  app.use((req, res, next) => {
    next();
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

    next();
  });

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(passport.initialize());
};
