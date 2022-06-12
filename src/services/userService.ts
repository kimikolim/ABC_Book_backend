import {
  BadRequestError,
  ForbiddenError,
  HttpError,
  NotFoundError,
} from 'routing-controllers'

import { IUser, User } from '../models/userModel'
import { UserListResponse, UserResponse } from '../resources/userResponse'

export class UserService {
  async getUserByEmail(email: string) {
    try {
      return User.findOne({ email: email })
    } catch (error) {
      throw new BadRequestError('Error: Unable to find user.')
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
    // Verify if email already exists
    try {
      const checkExistingUser = await this.getUserByEmail(user.email)
      // console.log(checkExistingUser)
      if (checkExistingUser) {
        return new ForbiddenError('Email already exists. Use another email.')
      }
    } catch (error) {
      throw new HttpError(500, 'Server Error.')
    }

    // New Account Creation
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
      throw new HttpError(500, 'Update failed')
    }
  }

  async deleteUserById(id: string) {
    try {
      const response = await User.findByIdAndDelete(id)
      return new UserResponse('User deleted', response!)
    } catch (error) {
      throw new HttpError(500, 'Delete failed')
    }
  }
}
