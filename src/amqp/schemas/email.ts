import joi from '@hapi/joi';

export const sendEmailSchema = joi.object({
  content: joi.object({
    to: joi.array().items(joi.string()).required(),
    from: joi.string().required(),
    subject: joi.string().required(),
    text: joi.string().required(),
  }),
});
