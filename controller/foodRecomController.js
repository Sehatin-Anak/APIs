const { PrismaClient } = require("@prisma/client");
const { paginateFoodRecom, datafromML} = require("../utils/utils");
const prisma = new PrismaClient();

exports.getRecomend = async (req, res) => {
  const pagination = req.query.pagination;
  const userId = req.params.userId
  let finalData;

  try {
    const child = await prisma.child.findUnique({
      where: { userId }
    });

    const foodRecom = await prisma.foodRecom.findMany({
      where: {
        childId: child.id,
        ageCategory: child.ageCategory
      },
      include: {
        nutritionInfo: true,
        Ingredients: true,
        Instructions: {
          orderBy: {
            stepOrder: 'asc'
          }
        }
      }
    })

    if (foodRecom.length === 0) {
      const datas = await datafromML(child.ageCategory || null)
      const created = [];
      
      for (let i = 0; i < datas.length; i++) {
        const create = await prisma.foodRecom.create({
          data: {
            ...datas[i].foodRecom,
            ageCategory: child.ageCategory || null,
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

      finalData = created.slice(0, pagination)

      return res.status(200).json({
        message: 'Data created',
        data: finalData,
      });
    }
    finalData = await paginateFoodRecom(child.id, pagination);

    res.status(200).json({
      data: finalData,
    });
  } catch (error) {
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message
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
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message
    });
  }
};