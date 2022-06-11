import { BadRequestError, ForbiddenError } from 'routing-controllers'

import { IUser, Role, User } from '../models/userModel'
import { UserListResponse, UserResponse } from '../resources/userResponse'

export class UserService {
  async getUserByEmail(email: string) {
    try {
      return new User({
        email: 'user@email.com',
        password: 'test',
        role: Role.ADMIN,
      })
    } catch (error) {
      throw new ForbiddenError('Book was not created')
    }
  }

  async getAllUsers() {
    try {
      const response = await User.find()
      // console.log(response[0].id)
      return new UserListResponse('Fetched all users', response)
    } catch (error) {
      throw new BadRequestError('Fetch Failed')
    }
  }
  async getUserById(id: string) {}

  async createUser(user: IUser) {
    const { name, email, password, role } = user
    const newUser = new User({
      name,
      email,
      password,
      role,
    })

    try {
      const response = await newUser.save()
      return new UserResponse('New User Created', response)
    } catch (error) {
      throw new BadRequestError('Create User failed')
    }
  }

  async updateUserById() {}
  async deleteUserById() {}
}
