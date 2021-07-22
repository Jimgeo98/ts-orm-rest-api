import Joi from 'joi'

export const validAuthor = Joi.object ({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer()
})

export const validBook = Joi.object({
  title: Joi.string().min(3).required(),
  pages: Joi.number().integer().required(),
  year: Joi.number().integer().min(4),
  author: Joi.string().required()
})

export const validShop = Joi.object({
  name: Joi.string().min(3).required(),
  copies: Joi.number().integer().required(),
  books: Joi.string().required()
})
