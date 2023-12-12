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
    const nutritionInfoData = {
      calories: req.body.calories,
      fat: req.body.fat,
      saturatedFat: req.body.saturatedFat,
      cholesterol: req.body.cholesterol,
      sodium: req.body.sodium,
      carbohydrates: req.body.carbohydrates,
      fiber: req.body.fiber,
      sugar: req.body.sugar,
      protein: req.body.protein,
    };

    const dataFoodRecom = {
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      Category: req.body.Category,
      agregateRating: req.body.agregateRating,
      reviewCount: req.body.reviewCount,
    };
    // assumming response data recipe from ML come from body

    // ***** TESTING INPUT DATA FOR TESTING SEARCH FEATURES *****

    // create nutrition info then create foodrecom then connect
    // new foodrecom data to nutrition that was just created
    const result = await prisma.$transaction([
      prisma.nutritionInfo
        .create({
          data: nutritionInfoData,
        })
        .then((data) => {
          prisma.foodRecom.update({
            where: {
              childId: child.id,
            },
            data: {
              dataFoodRecom,
              nutritionInfo: {
                connect: { id: data.id },
              },
            },
          });
        }),
    ]);

    res.json({
      result,
    });

    // ***** TESTING INPUT DATA FOR TESTING SEARCH FEATURES *****

    // **** GET RECIPE DATA FROM FOODRECOM TO CHECK,
    // **** IF USER GET FOODRECOM FOR FIRST TIME, INSERT DATA RECIPE FROM ML TO DB
    // **** ELSE RETRIEVE DATA FROM FOODRECOM TABLE
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = getRecomend;
