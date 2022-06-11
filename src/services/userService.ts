import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from 'routing-controllers'

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
      return new UserListResponse('Fetched all users', response)
    } catch (error) {
      throw new NotFoundError('Fetch Failed')
    }
  }

  async getUserById(id: string) {
    try {
      const response = await User.findById({ _id: id })
      return new UserResponse('Single User Found', response!)
    } catch (error) {
      throw new NotFoundError('User not found')
    }
  }

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

  async updateUserById(id: string, user: IUser) {
    try {
      const response = await User.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      })
      return new UserResponse('User Updated', response!)
    } catch (error) {
      throw new BadRequestError('Update failed')
    }
  }

  async deleteUserById(id: string) {
    try {
      const response = await User.findByIdAndDelete(id)
      return new UserResponse('User deleted', response!)
    } catch (error) {
      throw new BadRequestError('Delete failed')
    }
  }
}
