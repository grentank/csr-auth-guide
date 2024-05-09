const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);

module.exports = app;
