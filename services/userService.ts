import { ForbiddenError } from 'routing-controllers';

import { Role, User } from '../models/userModel';

export class UserService {
  async getUserByEmail(email: string) {
    try {
      return new User({
        email: 'user@email.com',
        password: 'test',
        role: Role.ADMIN,
      });
    } catch (error) {
      throw new ForbiddenError('Book was not created');
    }
  }
}
