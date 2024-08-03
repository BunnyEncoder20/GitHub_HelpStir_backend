const Joi = require('joi');

//User-defined function to validate the user
function validatePOST(data) {
  const POST_JoiSchema = Joi.object({
    title: Joi.string().max(30).required(),
    description: Joi.string().max(100).required(),
    dueDate: Joi.date().required(),
    priority: Joi.string()
      .valid('high')
      .valid('low')
      .valid('medium')
      .required(),
  }).options({ abortEarly: false });
  return POST_JoiSchema.validate(data);