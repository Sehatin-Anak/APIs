const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const search = async (req, res) => {
  const search = req.query.search;
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json({
      error: "Missing required header: Authorization",
    });
  }

  const tokenId = authorization.split(" ")[1];

  try {
    const child = await prisma.child.findUnique({
      where: {
        tokenId,
      },
    });

    const foodRecom = await prisma.foodRecom.findMany({
      where: {
        description: {
          contains: search
        },
        nutritionInfo: {
          OR: [
            {calories: {contains: search}},
            {fat: {contains: search}},           
            {saturatedFat: {contains: search}},  
            {cholesterol: {contains: search}},   
            {sodium: {contains: search}},
            {carbohydrates: {contains: search}}, 
            {fiber: {contains: search}},         
            {sugar: {contains: search}},         
            {protein: {contains: search}},       
          ]
        }
      },
    })
    // include: {
    //   nutritionInfo: {
    //     where: {
    //       OR: [
    //       ]
    //     }
    //   }
    // }
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
            content: {
              contains: search,
            },
          },
        ],
      },
    });

    res.status(200).json({
      data: {
        fruitsResult,
        vegetablesResult,
        snacksResult,
        articles
      },
    });
  } catch (error) {
    console.log(error);
    req.status(400).json({
      error: error,
    });
  }
};

module.exports = search