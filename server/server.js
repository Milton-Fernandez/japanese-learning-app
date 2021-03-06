const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dataRouter = require('./routes/data.router');
const formRouter = require('./routes/form.data.router');
const flashcardRouter = require('./routes/flashcard.data.router');
const resultRouter = require('./routes/result.router');
const userCreateRouter = require('./routes/user.create.data')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/data', dataRouter);
app.use('/flashcard',flashcardRouter);
app.use('/form', formRouter);
app.use('/result', resultRouter);
app.use('/usercreate', userCreateRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
