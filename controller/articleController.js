const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient

exports.getArticle = async (req, res) => {
    try {
        const articles = await prisma.article.findMany()
        
        res.status(200).json({
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}