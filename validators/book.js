const Joi = require("@hapi/joi");

const bookSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().required(),
  authors: Joi.string().required(),
  edition: Joi.string().required(),
  category: Joi.string().required(),
  bookInfo: Joi.string(),
  bookPages: Joi.number().required(),
  currentReadingPage: Joi.number(),
});

module.exports = {
  bookSchema,
};
