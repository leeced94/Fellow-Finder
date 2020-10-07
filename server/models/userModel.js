const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cardgame',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log('error is', err));

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 12,
  },
  password: {
    type: String,
    required: true,
  },
  bestRecord: {
    type: Number,
  },
  played: {
    type: Number,
    default: 0,
  },
});

const SALT_WORK_FACTOR = 10;

// not using arrow function so that we can have access to 'this'
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }

  // bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, passwordHash) => {
  //   if (err) return next(err);
  //   this.password = passwordHash;
  //   next();
  // });
});

module.exports = mongoose.model('User', userSchema);
