const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')

const { jwtsecretkey, jwtsecretadminkey, jwtexpires } = require('../config/environment')

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

passport.use(
  'jwtadmin',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtsecretadminkey
    },
    async (payload, done) => {
      try {
        const { userId, admin } = payload
        if (userId !== null && admin) {
          return done(null, userId)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

module.exports = passport
module.exports.generateJwtToken = (userId) => {
  const payload = {
    userId,
    admin: false
  }
  const options = {
    expiresIn: jwtexpires
  }
  return jwt.sign(payload, jwtsecretkey, options)
}

module.exports.generateAdminJwtToken = (userId) => {
  const payload = {
    userId,
    admin: true
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtsecretadminkey, options)
}
