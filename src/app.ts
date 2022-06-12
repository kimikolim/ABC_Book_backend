import passport from 'passport'
import {
  Action,
  createExpressServer,
  UnauthorizedError,
} from 'routing-controllers'
import { AuthController } from './controllers/authController'
import { BookController } from './controllers/bookController'
import { UserController } from './controllers/userController'
import { ErrorHandler } from './errors/ErrorHandler'
import { Role } from './models/userModel'

export const createApp = () => {
  const app = createExpressServer({
    controllers: [BookController, AuthController, UserController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler],
    authorizationChecker: (action: Action, roles: string[]) =>
      new Promise<boolean>((resolve, reject) => {
        passport.authenticate('jwt', (err, user, jwtToken) => {
          if (err || !user) {
            return reject(
              new UnauthorizedError('Invalid token or token is expired'),
            )
          }

          const role: Role = user.role
          if (roles.length > 0 && !roles.includes(role)) {
            return resolve(false)
          }
          // Set User in actions to be used later in currentUserChecker
          action.request.user = user
          return resolve(true)
        })(action.request, action.response, action.next)
      }),
    currentUserChecker: (action: Action) => action.request.user,
  })
  return app
}
