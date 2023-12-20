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
    res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
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
    res.status(400).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
