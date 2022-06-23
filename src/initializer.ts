import { Role } from './models/userModel'
import { UserService } from './services/userService'

export const initializer = async () => {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD
  if (!superAdminEmail || !superAdminPassword) {
    throw new Error('Invalid credentials for super admin')
  }

  const userService = new UserService()

  try {
    const result = await userService.getUserByEmail(superAdminEmail)
    if (!result) {
      await userService.createUser({
        name: 'Admin',
        email: superAdminEmail,
        password: superAdminPassword,
        role: Role.ADMIN,
      })
    }
  } catch (error: any) {
    console.error('Create Admin account initializer error.')
  }
}
