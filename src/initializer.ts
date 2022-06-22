import { Role } from './models/userModel'
import { UserService } from './services/userService'

export const initializer = async () => {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD
  if (!superAdminEmail || !superAdminPassword) {
    throw new Error('Invalid credentials for super admin')
  }

  const userService = new UserService()
  const user = await userService.getUserByEmail(superAdminEmail)
  if (!user) {
    await userService.createUser({
      name: 'Admin',
      email: superAdminEmail,
      password: superAdminPassword,
      role: Role.ADMIN,
    })
  }
}
