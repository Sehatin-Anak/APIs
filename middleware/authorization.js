require('dotenv').config()

const authorization = async (req, res, next) => {
  const authKey = [process.env.API_KEY]
  const apiKey = req.headers.authorization

  try {
    if (!apiKey) {
      throw new Error('Missing required header: Authorization')
    }
    
    const key = apiKey.split(' ')[1]

    if (!key || !authKey.includes(key)) {
      throw new Error('Unauthorized user')
    }
  } catch (error) {
    return res.status(400).json({
      errorName: error.name,
      errorMessage: error.message
    })
  }
  
  next()

}

module.exports = authorization;
