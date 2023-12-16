const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getChild = async (req, res) => {
  const tokenId = req.query.tokenId

  try {
    const child = await prisma.child.findFirst({
      where: {
        tokenId
      }
    })

    res.status(200).json({
      data: child
    })
  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

exports.create = async (req, res) => {
  const {tokenId} = req.query

  if (!tokenId) {
    res.status(400).json({
      error: 'Require tokenId'
    })
  }

  const data = {
    tokenId,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    ageCategory: req.body.ageCategory || null
  };
  
  try {
    const child = await prisma.child.create({
      data: data,
    });

    res.status(200).json({
      message: "Data Created",
      data: {
        child,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  const id = parseInt(req.params.id)
  const data = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    ageCategory: req.body.ageCategory || null
  }


  try {
    const updateChild = await prisma.child.update({
      where: {
        id: id
      },
      data
    })

    res.status(200).json({
      message: 'Data updated',
    })
    
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}
