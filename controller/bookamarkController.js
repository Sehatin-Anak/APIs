const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient

exports.getBookmark = async (req, res) => {



    // Code get bookmark
    // 
    // flow: 
    // user get bookmark
    // -> read table userbookmar where tokenId = req.query.tokenId 
    //    join table article dan foodrecom (foodrecom join table nutritionInfo, ingredient, instruction)
    // 
    // ## gw pake prisma (ORM), cara2 join table nya liat di prisma documentation ##
    
    
    
}

exports.createBookmark = async (req, res) => {
    
    

    // Code create bookmark
    // 
    // flow: 
    // user add article/foodrecom ke bookmark 
    // -> create table bookmark (articleId = req.params.id/foodrecomId = req.params.id, tokenId = req.query.tokenId)
    // 
    // ## gw pake prisma (ORM), cara2 create table nya liat di prisma documentation ##
    
    
    
}

exports.deleteBookmark = async (req, res) => {
    
    
    
    // Code delete bookmark
    // 
    // flow: 
    // user delete article/foodrecom dari bookmark
    // -> delete table bookmark where id: req.params.id
    // 
    // ## gw pake prisma (ORM), cara2 delete table nya liat di prisma documentation ##



}