import passport from 'passport'
import passportJwt from 'passport-jwt'
import { UserService } from './services/userService'

export const configureAuthStrategy = () => {
  const JwtStrategy = passportJwt.Strategy
  const ExtractJwt = passportJwt.ExtractJwt

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'test',
      },
      async function (jwtToken, done) {
        const user = await new UserService().getUserByEmail(jwtToken.email)
        return done(undefined, user, jwtToken)
      },
    ),
  )
}
