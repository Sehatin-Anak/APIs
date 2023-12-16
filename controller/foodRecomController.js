const { PrismaClient } = require("@prisma/client");
const { paginateFoodRecom, datafromML} = require("../utils/utils");
const prisma = new PrismaClient();
const fs = require("fs/promises");

exports.getRecomend = async (req, res) => {
  const pagination = req.query.pagination;
  const ageCategory = parseInt(req.query.ageCategory);
  let finalData;

  try {
    const child = await prisma.child.findFirst({
      where: { tokenId: req.query.tokenId },
      include: {
        foodRecom: {
          where: {
            ageCategory: ageCategory || null
          },
          include: {
            nutritionInfo: true,
            Ingredients: true,
            Instructions: {
              orderBy: {
                stepOrder: "asc",
              },
            },
          },
        },
      },
    });

    // pass ageCategory to API ML (make external request using axios)
    // store response from ML to database and then front end?
    
    // **** GET RECIPE DATA FROM FOODRECOM TO CHECK,
    // **** IF USER GET FOODRECOM FOR FIRST TIME, INSERT DATA RECIPE FROM ML TO DB
    // **** ELSE RETRIEVE DATA FROM FOODRECOM TABLE

    if (child.foodRecom.length === 0) {
      const datas = await datafromML(child.ageCategory || null)
      const created = [];
      
      for (let i = 0; i < datas.length; i++) {
        const create = await prisma.foodRecom.create({
          data: {
            ...datas[i].foodRecom,
            ageCategory: ageCategory || null,
            nutritionInfo: {
              create: datas[i].nutritionInfo,
            },
            Ingredients: {
              create: datas[i].Ingredient,
            },
            Instructions: {
              create: datas[i].Instruction,
            },
            child: {
              connect: { id: child.id },
            },
          },
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

        created.push(create);
      }

      finalData = paginateFoodRecom(created, pagination);

      return res.status(200).json({
        message: 'Data created',
        data: finalData,
      });
    }

    finalData = paginateFoodRecom(child.foodRecom, pagination);

    res.status(200).json({
      data: finalData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getUniqueRecom = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const foodRecom = await prisma.foodRecom.findUnique({
      where: {
        id,
      },
      include: {
        nutritionInfo: true,
        Ingredients: true,
        Instructions: {
          orderBy: {
            stepOrder: 'asc'
          }
        },
      },
    });

    res.status(200).json({
      data: foodRecom,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
