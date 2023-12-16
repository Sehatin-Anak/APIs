const { PrismaClient } = require("@prisma/client");
const { seraching } = require("../utils/utils");
const prisma = new PrismaClient();

const search = async (req, res) => {
  const search = req.query.search || "";
  const words = search.split(" ");

  try {
    // const child = await prisma.child.findFirst({
    //   where: {
    //     tokenId,
    //   },
    // });

    const foodRecom = await prisma.foodRecom.findMany({
      include: {
        nutritionInfo: true,
        Ingredients: true,
        Instructions: true,
      },
    });

    const articles = await prisma.article.findMany({
      include: {
        author: true,
      },
    });

    const foodRecomResult = seraching(foodRecom, search)
    const articleResult = seraching(articles, search)

    res.status(200).json({
      data: {
        foodRecom: foodRecomResult,
        articles: articleResult
      },
    });
  } catch (error) {
    console.log(error);
    req.status(400).json({
      error: error,
    });
  }
};

module.exports = search;
