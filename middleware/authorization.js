
// ****GANTI PAKE API KEY VALIDATION**** //

require('dotenv').config()

const authorization = async (req, res, next) => {
  const authKey = [process.env.API_KEY]
  const apiKey = req.query.apiKey

  if (!apiKey || authKey.includes(apiKey)) {
    res.status(401).json({
      error: 'Unauthorized user'
    })
  }

  next()
}

module.exports = authorization;
