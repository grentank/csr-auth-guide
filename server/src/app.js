const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const apiPostsRouter = require('./routes/postsRouter');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', apiPostsRouter);

module.exports = app;

