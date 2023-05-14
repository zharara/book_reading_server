const express = require("express");
const passport = require("passport");

module.exports = (app) => {
  app.use((req, res, next) => {
    next();
  });

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(passport.initialize());
};
