const jwtConfig = require('./jwtConfig');

const cookiesConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  // sameSite: 'none',
  // secure: true,
};

module.exports = cookiesConfig;
