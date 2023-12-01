require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const Router = require('./router/Router')

app.use(cors)
app.use(express.json())

// router

app.use('/', Router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
