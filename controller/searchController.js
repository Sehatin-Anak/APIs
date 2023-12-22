const { PrismaClient } = require("@prisma/client");
const { searchingFoodRecom, searchingArticle } = require("../utils/utils");
const prisma = new PrismaClient();

const search = async (req, res) => {
  const search = req.query.search || "";

  try {
    const foodRecom = await prisma.foodRecom.findMany({
      include: {
        nutritionInfo: true,
        Ingredients: true,
        Instructions: {
          orderBy: {
            stepOrder: "asc",
          },
        },
      },
    });

    // const articles = await prisma.article.findMany({
    //   include: {
    //     author: true,
    //   },
    // });

    const foodRecomResult = searchingFoodRecom(foodRecom, search)
    // const articleResult = searchingArticle(articles, search)

    res.status(200).json({
      data: {
        foodRecom: foodRecomResult,
        articles: articleResult
      },
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message
    });
  }
};

module.exports = search;