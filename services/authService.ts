import { ForbiddenError } from 'routing-controllers';

import * as jwt from 'jsonwebtoken';

import { LoginDTO } from '../dtos/loginDTO';
import { IUser, Role, User } from '../models/userModel';
import { LoginResponse } from '../resources/authResponse';

export class AuthService {
  async login(loginDto: LoginDTO) {
    try {
      // check if user exist
      // check if password match
      // generate jwt
      // return jwt

      const token = this.generateToken(
        new User({
          email: 'user@email.com',
          password: 'test',
          role: Role.ADMIN,
        }),
      );
      return new LoginResponse('Login success', token);
    } catch (error) {
      throw new ForbiddenError('Book was not created');
    }
  }

  private generateToken(user: IUser) {
    const JWT_SECRET = 'test';
    const TOKEN_EXPIRY = '1d';
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
    );
    return token;
  }
}
