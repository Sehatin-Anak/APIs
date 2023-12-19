require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const verifyUser = async (req, res) => {
  const idToken = req.headers.idtoken;

  try {
    if (!idToken) {
      throw new Error('Missing required header: idToken')  
    }

    const ticket = client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = (await ticket).getPayload();

    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (user) {
      return res.status(200).json({
        message: `Welcome Back ${user.name}`,
        user,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        img: payload.picture,
      },
    });

    res.status(200).json({
      message: `Welcome ${newUser.name}`,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message
    })
  }
};

module.exports = verifyUser