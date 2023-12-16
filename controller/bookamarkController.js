const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getArticleBookmark = async (req, res) => {
  const tokenId = req.query.tokenId;
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: {
        userToken: tokenId,
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

exports.getRecipeBookmark = async (req, res) => {        
  const tokenId = req.query.tokenId;
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: {
        userToken: tokenId,
        NOT: {
          foodRecomId: {
            equals: null,
          },
        },
      },
      include: {
        foodRecom: true,
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
  const tokenId= req.query.tokenId;
  const id = parseInt(req.params.id);

  try {
    const bookmark = await prisma.userBookmark.create({
      data: {
        userToken: tokenId,
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
  const tokenId = req.query.tokenId;
  const id = parseInt(req.params.id);

  try {
    const bookmark = await prisma.userBookmark.create({
      data: {
        userToken: tokenId,
        foodRecomId: id,
      },
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

exports.deleteBookmark = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.userBookmark.delete({
      where: {
        id,
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
  // Code delete bookmark
  //
  // flow:
  // user delete article/foodrecom dari bookmark
  // -> delete table bookmark where id: req.params.id
  //
  // ## gw pake prisma (ORM), cara2 delete table nya liat di prisma documentation ##
};
