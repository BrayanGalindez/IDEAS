const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')

const { jwtsecretkey, jwtexpires } = require('../config/environment')

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtsecretkey
    },
    async (payload, done) => {
      try {
        const userId = payload.userId
        return done(null, userId !== null ? userId : false)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

module.exports = passport
module.exports.generateJwtToken = (userId) => {
  const payload = {
    userId
  }
  const options = {
    expiresIn: jwtexpires
  }
  return jwt.sign(payload, jwtsecretkey, options)
}
