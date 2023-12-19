require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
// const { google } = require("googleapis");

const verifyUser = async (req, res) => {
  const tokenId = req.qeury.tokenId;

  try {
    const ticket = client.verifyIdToken({
      idToken: tokenId,
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
  } catch (error) {}
};

module.exports = verifyUser

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   "http://localhost:8080/auth/google/callback"
// );

// const scope = [
//   "https://www.googleapis.com/auth/userinfo.email",
//   "https://www.googleapis.com/auth/userinfo.profile",
//   "openid",
// ];

// const authorizationUlr = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: scope,
//   include_granted_scopes: true,
// });

// const googleAuth = async (req, res) => {
//   res.redirect(authorizationUlr);
// };

// const googleAuthCallback = async (req, res) => {
//   try {
//     const { code } = req.query;

//     const { tokens } = await oauth2Client.getToken(code);

//     oauth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({
//       auth: oauth2Client,
//       version: "v2",
//     });

//     const { data } = await oauth2.userinfo.get();

//     if (!data.email || !data.name) {
//       console.log(data);
//     }

//     console.log(data);

//     const user = await prisma.user.findUnique({
//       where: { id: data.id, email: data.email },
//       include: {
//         child: true,
//       },
//     });

//     if (user) {
//       return res.json({
//         message: `welcome ${user.name}`,
//         user,
//       });
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         id: data.id,
//         email: data.email,
//         name: data.name,
//         img: data.picture,
//       },
//     });

//     console.log(newUser);

//     return res.json({
//       message: `Welcome to Senak - ${newUser.name}`,
//       user: newUser,
//     });
//   } catch (error) {
//     console.log(error, error.message);
//   }
// };

// module.exports = { googleAuth, googleAuthCallback };
