const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post(
  '/login',
  userController.verifyUser,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a POST req to '/api/login' endpoint`);
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const leaderBoard = {
      bestRecords: res.locals.bestRecords,
      mostPlayed: res.locals.mostPlayed,
    };
    res.status(200).json({ user, leaderBoard });
  }
);

router.post(
  '/signup',
  userController.createUser,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a POST req to '/api/signup' endpoint`);
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const leaderBoard = {
      bestRecords: res.locals.bestRecords,
      mostPlayed: res.locals.mostPlayed,
    };
    res.status(200).json({ user, leaderBoard });
  }
);

router.put(
  '/update',
  userController.updateRecord,
  userController.getLeaderBoard,
  (req, res) => {
    console.log(`returning a PUT req to '/api/update endpoint`);
    const { username, played } = res.locals.user;
    const bestRecord = res.locals.user.bestRecord || null;
    const user = { username, bestRecord, played };
    const leaderBoard = {
      bestRecords: res.locals.bestRecords,
      mostPlayed: res.locals.mostPlayed,
    };
    res.status(200).json({ user, leaderBoard });
  }
);

// router.delete("/delete", userController.deleteUser, (req, res) => {
//   console.log(`returning a DELETE req to '/api/delete' endpoint`);
//   const { username, played } = res.locals.user;
//   const bestRecord = res.locals.user.bestRecord || null;
//   res.status(200).json({ username, bestRecord, played });
// });

router.delete('/delete', userController.deleteAllUsers, (req, res) => {
  res.status(200).send('All user deleted!');
});

router.put('/user/:username', userController.updateUsername, (req, res) => {
  const { user } = res.locals;
  res.status(200).send(user);
});

router.delete('/user/:username', userController.deleteUsername, (req, res) => {
  res.status(200).send('User is deleted');
});

module.exports = router;
