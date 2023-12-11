const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRecomend = async (req, res) => {
  try {
    const child = await prisma.child.findUnique({
      where: { tokenId: req.query.tokenId },
    });

    const ageCategory = child.ageCategory;
    
    // pass ageCategory to API ML (make external request using axios)
    // store response from ML to database and then front end?
    
    // assumming response data recipe from ML come from body
    const dataRecipe = {
      name: req.body.name,
      nutritionInfo: req.body.nutritionInfo,
      description: req.body.description,
      img: req.body.img,
    };

    // **** GET RECIPE DATA FROM FOODRECOM TO CHECK,
    // **** IF USER GET FOODRECOM FOR FIRST TIME, INSERT DATA RECIPE FROM ML TO DB
    // **** ELSE RETRIEVE DATA FROM FOODRECOM TABLE

  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = getRecomend