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
};

userController.deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    console.log('all users are deleted');
    next();
  } catch (err) {
    next({
      message: `Error in userController.deleteAllUsers ${err}`,
    });
  }
};

userController.updateUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { newUserName } = req.body;
    console.log(username, newUserName, req.body);
    const user = await User.findOneAndUpdate(
      { username },
      { username: newUserName },
      { new: true }
    );
    console.log(user);
    res.locals.user = user;
    next();
  } catch (err) {
    next({
      message: `Error in userController.updateUsername ${err}`,
    });
  }
};

userController.deleteUsername = async (req, res, next) => {
  const { username } = req.params;
  await User.findOneAndDelete({ username });
  return next();
};

module.exports = userController;
