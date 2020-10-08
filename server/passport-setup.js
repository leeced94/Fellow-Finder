const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/userModel');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/abc',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ username: profile.id });

      if (user) {
        console.log('found user', user);
        done(null, user);
      } else {
        const newUser = await User.create({
          username: profile.id,
          password: profile.id,
        });
        console.log('new user', newUser);
        done(null, newUser);
      }
    }
  )
);
