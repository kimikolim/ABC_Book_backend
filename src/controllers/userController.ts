import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  BadRequestError,
  Authorized,
} from 'routing-controllers'
import { IUser } from '../models/userModel'
import { UserService } from '../services/userService'
const { registerValidator } = require('../resources/userValidation')

@JsonController('/user')
/**
 * Only Accessible by Admin and Editor
 */
@Authorized(['ADMIN'])
export class UserController {
  private userService = new UserService()
  @Authorized(['ADMIN', 'EDITOR'])
  @Get()
  getAll() {
    const result = this.userService.getAllUsers()
    return result
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const result = this.userService.getUserById(id)
    return result
  }

  /**
   * Only Admin can Add, remove or delete user.
   */

  @Post('')
  async createUser(@Body() user: IUser) {
    // Joi validation of incoming body: IUser
    const validateNewUser = await registerValidator.validate(user)
    if (validateNewUser.error) {
      const message = validateNewUser.error.details[0].message
      throw new BadRequestError(`${message}`)
    }
    const validatedNewUser = validateNewUser.value

    // Check if passwords match
    if (validatedNewUser.password !== validatedNewUser.confirmPassword) {
      throw new BadRequestError('Passwords did not match. Please try again.')
    }

    // Send only hashed password to createUser service
    const validatedNewAccount: IUser = {
      name: validatedNewUser.name,
      email: validatedNewUser.email,
      password: validatedNewUser.password,
      role: validatedNewUser.role,
    }

    const result = this.userService.createUser(validatedNewAccount)
    return result
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: IUser) {
    const result = this.userService.updateUserById(id, user)
    return result
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    const result = this.userService.deleteUserById(id)
    return result
  }
}
