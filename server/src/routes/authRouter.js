const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) return res.sendStatus(400);

  const hashpass = await bcrypt.hash(password, 10);
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, hashpass },
  });
  if (!created) return res.sendStatus(400);

  const user = newUser.get();
  delete user.hashpass;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookieConfig)
    .json({ accessToken, user });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) return res.sendStatus(400);
  const isValid = await bcrypt.compare(password, foundUser.hashpass);
  if (!isValid) return res.sendStatus(400);

  const user = foundUser.get();
  delete user.hashpass;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookieConfig)
    .json({ accessToken, user });
});

authRouter.post('/logout', async (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = authRouter;
