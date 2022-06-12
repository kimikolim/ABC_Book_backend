import { ForbiddenError, HttpError, NotFoundError } from 'routing-controllers'

import * as jwt from 'jsonwebtoken'

import { LoginDTO } from '../dtos/loginDTO'
import { IUser } from '../models/userModel'
import { LoginResponse } from '../resources/authResponse'
import { UserService } from './userService'
const bcrypt = require('bcryptjs')

export class AuthService {
  private generateToken(user: IUser) {
    const JWT_SECRET = 'test'
    const TOKEN_EXPIRY = '1d'
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRY,
      },
    )
    return token
  }

  async login(loginDto: LoginDTO) {
    try {
      // check if user exist
      const checkExistingUser = await new UserService().getUserByEmail(loginDto.email)
      // console.log(checkExistingUser);
      if (!checkExistingUser) {
        return new NotFoundError('Email does not exist. Invalid email.')
      }
      // Check if password match
      let isPasswordCorrect = false
      try {
        isPasswordCorrect = await bcrypt.compareSync(
          loginDto.password,
          checkExistingUser.password,
        )
      } catch (error:any) {
        return new HttpError(500, error)
      }

      // If passoword is incorrect.
      if (!isPasswordCorrect) {
        return new ForbiddenError('Incorrect Password. Please try again.')
      }

      /**
       * Generate JWT token and return
       * Pass User details after checking if exists
       */
      const token = this.generateToken(checkExistingUser)
      return new LoginResponse('Login success', token)
    } catch (error) {
      throw new ForbiddenError('Login Fail. Please try again.')
    }
  }
}
