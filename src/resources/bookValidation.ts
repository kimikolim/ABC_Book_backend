import Joi from 'joi'
import moment from 'moment'

const currentYear: number = parseInt(moment().format('YYYY'))
module.exports = {
  bookValidator: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(0).required(),
    genre: Joi.string().min(0).required(),
    author: Joi.string().min(2).required(),
    yearPublished: Joi.number().integer().min(1800).max(currentYear).required(),
    availability: Joi.boolean().required(),
    borrower: Joi.string()
  }),
}
