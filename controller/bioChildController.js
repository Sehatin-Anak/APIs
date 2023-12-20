
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getChild = async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        child: true,
      },
    });

    res.status(200).json({
      data: user.child,
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};

exports.create = async (req, res) => {
  const id = req.params.userId;

  const data = {
    name: req.body.name,
    age: req.body.age,
    ageCategory: req.body.ageCategory || null,
    weight: req.body.weight,
    tall: req.body.tall,
  };

  try {
    const child = await prisma.child.create({
      data: {
        ...data,
        user: {
          connect: {
            id,
          },
        },
      },
    });

    res.status(200).json({
      message: "Data Created",
      data: {
        child,
      },
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const userId = req.params.userId;
  const data = {
    name: req.body.name,
    age: req.body.age,
    ageCategory: req.body.ageCategory || null,
    weight: req.body.weight,
    tall: req.body.tall,
  };

  try {
    const update = await prisma.child.update({
      where: {
        userId,
      },
      data,
    });

    res.status(200).json({
      message: "Data updated",
      data: update,
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
