const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next({ message: 'Missing username/password' });

    const user = await User.create({ username, password });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log('database error', err);
    next({
      message: `Error in userController.createUser database error ${JSON.stringify(
        err
      )}`,
    });
  }

  // const { username, password } = req.body;
  // if (!username || !password)
  //   return next({ message: 'Missing username/password' });
  // User.create({ username, password }, (err, user) => {
  //   if (err) {
  //     console.log('database error', err);
  //     return next({
  //       message: `Error in userController.createUser database error ${JSON.stringify(
  //         err
  //       )}`,
  //     });
  //   } else {
  //     res.locals.user = user;
  //     return next();
  //   }
  // });
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next({ message: 'Missing username/password' });

    const user = await User.findOne({ username });

    if (!user)
      return next({ message: `Error: Username ${username} not found` });

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    next({
      message: `Error in userController.verifylUsers ${JSON.stringify(err)}`,
    });
  }

  // const { username, password } = req.body;
  // if (!username || !password)
  //   return next({ message: 'Missing username/password' });
  // User.findOne({ username }, (err, foundUser) => {
  //   if (err) {
  //     return next({
  //       message: `Error in userController.verifylUsers ${JSON.stringify(err)}`,
  //     });
  //   } else if (foundUser) {
  //     bcrypt.compare(password, foundUser.password, (err, result) => {
  //       if (result === true) {
  //         res.locals.user = foundUser;
  //         return next();
  //       }
  //     });
  //   } else {
  //     return next({ message: `Error: Username ${username} not found` });
  //   }
  // });
};

userController.updateRecord = async (req, res, next) => {
  try {
    const {
      user: { username, bestRecord, played },
      clickCount,
    } = req.body;

    const newRecord = bestRecord
      ? Math.min(clickCount, bestRecord)
      : clickCount;

    const update = {
      username,
      bestRecord: newRecord,
      played: played + 1,
    };

    const updatedUser = await User.findOneAndUpdate({ username }, update, {
      new: true,
    });

    if (!updatedUser) {
      console.log('asd');
      return next({ message: `Error: Username ${username} not found` });
    }

    console.log('updated user from db', updatedUser);
    res.locals.user = updatedUser;
    next();
  } catch (err) {
    next({
      message: `Error in userController.updateRecord ${err}`,
    });
  }

  // const { username, bestRecord, played } = req.body.user;
  // const { clickCount } = req.body;

  // let newRecord;

  // if (bestRecord) {
  //   newRecord = Math.min(clickCount, bestRecord);
  // } else newRecord = clickCount;

  // const update = {
  //   username,
  //   bestRecord: newRecord,
  //   played: played + 1,
  // };

  // User.findOneAndUpdate({ username }, update, { new: true }, (err, updated) => {
  //   if (err) {
  //     return next({
  //       message: `Error in userController.updateRecord ${JSON.stringify(err)}`,
  //     });
  //   } else if (updated) {
  //     console.log('updated user from db', updated);
  //     res.locals.user = updated;
  //     return next();
  //   } else {
  //     return next({ message: `Error: Username ${username} not found` });
  //   }
  // });
};

userController.getLeaderBoard = async (req, res, next) => {
  try {
    const bestRecords = await User.find({ bestRecord: { $ne: null } })
      .limit(4)
      .sort('bestRecord')
      .select('username bestRecord');

    const mostPlayed = await User.find()
      .limit(4)
      .sort('-played')
      .select('username played');

    if (!bestRecords || !mostPlayed)
      return next({ message: `no result somehow` });

    res.locals.bestRecords = bestRecords;
    res.locals.mostPlayed = mostPlayed;

    next();
  } catch (err) {
    next({
      message: `Error in userController.getLeaderBoard ${err}`,
    });
  }

  // User.find({ bestRecord: { $ne: null } })
  //   .limit(4)
  //   .sort('bestRecord')
  //   .select('username bestRecord')
  //   .exec((err, result) => {
  //     if (err) {
  //       return next({
  //         message: `Error in userController.getLeaderBoard ${JSON.stringify(
  //           err
  //         )}`,
  //       });
  //     } else if (result) {
  //       res.locals.bestRecords = result; // an array of objects [ {username, bestRecord}, ... ]
  //       User.find()
  //         .limit(4)
  //         .sort('-played')
  //         .select('username played')
  //         .exec((err, result2) => {
  //           if (err) {
  //             return next({
  //               message: `Error in userController.getLeaderBoard ${JSON.stringify(
  //                 err
  //               )}`,
  //             });
  //           } else if (result2) {
  //             res.locals.mostPlayed = result2; // an array of objects [ {username, played}, ... ]
  //             return next();
  //           } else return next({ message: `no result somehow` });
  //         });
  //     } else return next({ message: `no result somehow` });
  //   });
};

userController.deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    console.log('all users are deleted');
    next();
  } catch (err) {
    next({});
  }
};

module.exports = userController;
