import passport from 'passport';
import { Action, createExpressServer, UnauthorizedError } from 'routing-controllers';
import { AuthController } from './controllers/authController';
import { BookController } from './controllers/bookController';
import { ErrorHandler } from './errors/ErrorHandler';

export const createApp = () => {
  const app = createExpressServer({
    controllers: [BookController, AuthController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler],
    authorizationChecker: (action: Action, roles: string[]) =>
      new Promise<boolean>((resolve, reject) => {
        passport.authenticate('jwt', (err, user, jwtToken) => {
          if (err || !user) {
            return reject(
              new UnauthorizedError('Invalid token or token is expired'),
            );
          }

          const role = user.role;
          if (roles.length > 0 && !roles.includes(role)) {
            return resolve(false);
          }
          action.request.user = user;
          return resolve(true);
        })(action.request, action.response, action.next);
      }),
    currentUserChecker: (action: Action) => action.request.user,
  });
  return app;
};
