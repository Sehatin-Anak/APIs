require('dotenv').config()
const jwt = require('jsonwebtoken')
const refreshTokenSecret = process.env.REFRESH_ACCESS_TOKEN;
const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN;

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, accessTokenSecret, { expiresIn: "1h" });
  return token;
};

const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, refreshTokenSecret, { expiresIn: "30d" });
  return token;
};

module.exports = { 
    generateAccessToken, 
    generateRefreshToken 
};
