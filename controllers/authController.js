const passport = require("passport");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../models");

const validators = require("../validators");

const login = (req, res, next) => {
  const { error } = validators.loginValidator.validate(req.body);

  if (error) {
    const reqError = createError(400, error.details[0].message);
    next(reqError);
  }

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      const reqError = createError(500, "Server error!");
      return next(reqError);
    }
    if (!user) {
      const reqError = createError(401, "Invalid username or password!");
      return next(reqError);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.json({
      user: user,
      token: token,
    });
  })(req, res, next);
};

const register = async (req, res, next) => {
  try {
    const { error, value } = validators.createUserValidator.validate(req.body);

    if (error) {
      const reqError = createError(400, error.details[0].message);
      return next(reqError);
    }

    const { email } = value;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const reqError = createError(409, "User already exists!");
      return next(reqError);
    }
    const newUser = new User(value);
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

    return res.json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    const reqError = createError(500, "Server error!");
    return next(reqError);
  }
};

module.exports = {
  login,
  register,
};
