const Joi = require("@hapi/joi");

const categorySchema = Joi.object({
  user: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = {
  categorySchema,
};
