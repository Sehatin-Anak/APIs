const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient

exports.getArticle = async (req, res) => {
    try {
        const articles = await prisma.article.findMany()
        
        res.status(200).json({
            data: articles
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

exports.createArticle = async (req, res) => {
    const data = req.body

    try {
        const article = await prisma.article.create({
            data
        })

        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
}