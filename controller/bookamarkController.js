const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getArticleBookmark = async (req, res) => {
  const userId = req.params.id;
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: {
        userId,
        NOT: {
          articleId: {
            equals: null,
          },
        },
      },
      include: {
        article: true,
      },
    });

    res.status(200).json({
      data: bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.getFoodRecomBookmark = async (req, res) => {        
  const userId = req.params.id;
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: {
        userId,
        NOT: {
          foodRecomId: {
            equals: null,
          },
        },
      },
      include: {
        foodRecom: {
          include: {
            nutritionInfo: true
          }
        },
      },
    });

    res.status(200).json({
      data: bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.bookmarkArticle = async (req, res) => {
  const userId = req.params.userId;
  const id = parseInt(req.params.id);
  
  try {
    const bookmark = await prisma.userBookmark.create({
      data: {
        userId,
        articleId: id,
      },
      include: {
        article: true
      }
    });
    
    res.status(200).json({
      message: "Bookmark Created",
      data: {
        bookmark,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

exports.bookmarkFoodRecom = async (req, res) => {
  const userId = req.params.userId;
  const id = parseInt(req.params.id);
  
  try {
    const bookmark = await prisma.userBookmark.create({
      data: {
        userId,
        foodRecomId: id,
      },
      include: {
        foodRecom: {
          include: {
            nutritionInfo: true,
            // Ingredients: true,
            // Instructions: true
          }
        }
      }
    });

    res.status(200).json({
      data: bookmark,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.deleteBookmarkedArticle = async (req, res) => {
  const userId = req.params.userId;
  const articleId = parseInt(req.params.id)

  try {
    await prisma.userBookmark.delete({
      where: {
        User_Article_Unique: {
          userId,
          articleId
        }
      },
    });
    
    res.status(200).json({
      message: "Bookmark Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
exports.deleteBookmarkedFoodRecom = async (req, res) => {
  const userId = req.params.userId;
  const foodRecomId = parseInt(req.params.id)
  
  try {
    await prisma.userBookmark.delete({
      where: {
        User_FoodRecom_Unique: {
          userId,
          foodRecomId
        }
      },
    });
    
    res.status(200).json({
      message: "Bookmark Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
