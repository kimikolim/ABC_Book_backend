import Joi from 'joi'
import { Role } from '../models/userModel'

module.exports = {
  registerValidator: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(Role).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required(),
  }),

  loginValidator: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}
