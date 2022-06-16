import {
  JsonController,
  Body,
  Post,
  BadRequestError,
} from 'routing-controllers'
import { LoginDTO } from '../dtos/loginDTO'
import { AuthService } from '../services/authService'
const { loginValidator } = require('../resources/userValidation')

@JsonController('/login')
export class AuthController {
  private authService = new AuthService()
  @Post()
  async login(@Body() loginDto: LoginDTO) {
    // Joi validation
    const validateLoginDto = await loginValidator.validate(loginDto)
    if (validateLoginDto.error) {
      const message = validateLoginDto.error.details[0].message
      throw new BadRequestError(`${message}`)
    }

    const validatedLogin = validateLoginDto.value
    return this.authService.login(validatedLogin)
  }
}
