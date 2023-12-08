const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient

exports.getRecomend = async (req, res) => {
    try {
        const child = await prisma.child.findUnique({
            where: {tokenId: req.body.tokenId}
        })

        const ageCategory = child.ageCategory

        // pass ageCategory to API ML
        // store response from ML to database and front end

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}