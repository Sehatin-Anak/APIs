
// ****GANTI PAKE API KEY VALIDATION**** //

require('dotenv').config()

const authorization = async (req, res, next) => {
  const authKey = [process.env.API_KEY]
  const apiKey = req.query.apiKey
  try {
    if (!apiKey || authKey.includes(apiKey)) {
      throw new Error('Unauthorized user')
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message
    })
  }
  
  next()

}

module.exports = authorization;
