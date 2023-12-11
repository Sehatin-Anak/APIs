require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const authRouter = require('./router/auth')
const dashboardRouter = require('./router/dashboard')
const childBio = require('./router/childBio')

app.use(express.json())
app.use(cors())

// router

app.use('/', authRouter)
app.use('/', dashboardRouter)
app.use('/', childBio)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
