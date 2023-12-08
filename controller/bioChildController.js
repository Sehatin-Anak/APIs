const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const data = {
    tokenID: req.body.tokenID,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  };

  try {
    const child = await prisma.child.create({
      data: data,
    });
    res.status(200).json({
      message: "Success",
      data: child,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
