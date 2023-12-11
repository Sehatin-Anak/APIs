// 
// *****Code ini buat percobaan jwt aja*****
// *****Implementasi authnya tetep pake firebase*****
// 

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const refreshTokenSecret = process.env.REFRESH_ACCESS_TOKEN;

exports.register = async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 8).then(async (hash) => {
    await prisma.user
      .create({
        data: {
          username: username,
          password: hash,
        },
      })
      .then((user) => {
        res.status(200).json({
          message: "New User Created",
          data: user,
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          message: err,
        });
      });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) res.status(400).json({ message: "User does not exist" });
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match)
      res
        .status(400)
        .json({ message: "wrong username and password conbination" });
    else {
      let refreshToken;
      const userPayload = {
        id: user.id,
        username: user.username,
      };

      const accessToken = generateAccessToken(userPayload);

      if (user.refreshToken) {
        jwt.verify(user.refreshToken, refreshTokenSecret, async (err) => {
          if (err) {
            refreshToken = generateRefreshToken(userPayload);
            await prisma.user.update({
              where: { id: user.id },
              data: { refreshToken },
            });
          }
          refreshToken = user.refreshToken;
        });
      } else {
        refreshToken = generateRefreshToken(userPayload);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            refreshToken,
          },
        });
      }

      res.status(200).json({
        message: "WELCOME",
        user: userPayload,
        accessToken,
        refreshToken,
      });
    }
  });
};
