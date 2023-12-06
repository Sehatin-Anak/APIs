require("dotenv").config();
const jwt = require("jsonwebtoken");

// code for verify user token
const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    res.status(400).json({ error: "Missing required header: Authorization" });

  const accessToken = authorization.split(" ")[1];

  try {
    const decodedUser = jwt.verify(
      accessToken,
      process.env.SECRET_ACCESS_TOKEN,
      {
        ignoreExpiration: false,
      }
    );
    req.user = decodedUser;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ message: "Token Expired" });

    res.status(401).json({ message: "Unautorized user" });
  }
};

module.exports = verifyToken;
