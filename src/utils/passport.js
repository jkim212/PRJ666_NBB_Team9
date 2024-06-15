const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// Configure JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {


  if (jwt_payload) {
    done(null, {
      id: jwt_payload.id,
      email: jwt_payload.email,
      role: jwt_payload.role,
    });
  } else {
    done(null, false);
  }
});

passport.use(strategy);

const authenticateJWT = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticateJWT,
};
