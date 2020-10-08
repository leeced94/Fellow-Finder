const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// router.delete('/delete', userController.deleteUser, (req, res) => {
//   console.log(`returning a DELETE req to '/api/delete' endpoint`);
//   const { username, played } = res.locals.user;
//   const bestRecord = res.locals.user.bestRecord || null;
//   res.status(200).json({ username, bestRecord, played });
// });

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req, res) {
//     console.log('what is response from google callback', res);
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

// -----------------

//how does it know? authenticate('google') it is "google"
// auth googe login handler (google log in splash screen)

// /auth/login
router.get(
  '/login',
  passport.authenticate('google', {
    // declare our scope, specify what and how much info we want from user
    scope: ['profile'],
  })
);

// callback route for google redirect URI
// /auth/abc?code=
router.get(
  '/abc',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user);
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // const part = fullUrl.split('?')[1];
    res.redirect(`http://localhost:8080/?id=${req.user.username}`);
  }
);

module.exports = router;

// router methods will be exported to server.js
