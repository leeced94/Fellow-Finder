require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

const apiRouter = require('./routes/api');
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
// const authRouter = require("./routes/auth");
// require('./passport-setup');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// app.use(cookieParser());

// // session
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//   })
// );

// // passport
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api', apiRouter);
// app.use('/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err); // err = {message: 'error message'}
  res.status(500).json(err);
});

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
