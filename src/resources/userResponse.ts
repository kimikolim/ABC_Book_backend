import { IUser, Role } from '../models/userModel'

// class User {
//   id: string
//   name: string
//   email: string
//   password: string
//   role: Role
//   constructor(user: IUser) {
//     this.id = user.id ?? ''
//     this.name = user.name
//     this.email = user.email
//     this.password = user.password
//     this.role = user.role
//   }
// }
/**
 * Mapping single user response from DB
 */

type FormattedUser = {
  id: string
  name: string
  email: string
  role: Role
}
const formatUser = (user: IUser) => {
  return {
    id: user.id ?? '',
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export class UserResponse {
  message: string
  user: FormattedUser

  constructor(message: string, user: IUser) {
    this.message = message
    this.user = formatUser(user)
  }
}
/**
 * Mapping list of users response from DB
 */
export class UserListResponse {
  message: string
  users: FormattedUser[]

  constructor(message: string, users: IUser[]) {
    this.message = message
    this.users = []
    users.map((user) => this.users.push(formatUser(user)))
  }
}
