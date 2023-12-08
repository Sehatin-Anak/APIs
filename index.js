require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const authRouter = require('./router/authRouter')
const dashboardRouter = require('./router/dashboardRouter')
const childBio = require('./router/childBioRouter')

app.use(express.json())
app.use(cors())

// router

app.use('/', authRouter)
app.use('/', dashboardRouter)
app.use('/', childBio)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
