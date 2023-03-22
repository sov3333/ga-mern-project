import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from './mongodb/models/User.js';

const initialize = (passport) => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });
  passport.deserializeUser((id, callback) => {
    User.findOne({ _id: id }, (err, user) => {
      callback(err, user);
    });
  });
};

export default initialize;
