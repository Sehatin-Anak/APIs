const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllArticle = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
      },
    });

    res.status(200).json({
      data: articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.getUniqueArticle = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    res.status(200).json({
      data: article,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

// exports.createArticle = async (req, res) => {
//   const data = articleDatas;
//   const created = [];

//   try {
//     for (let i = 0; i < data.length; i++) {
//       const article = await prisma.article.create({
//         data: {
//           ...data[i].article,
//           author: {
//             create: data[i].author,
//           },
//         },
//         include: {
//           author: true,
//         },
//       });
//       created.push(article);
//     }

//     res.status(200).json({
//       data: created,
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };
