require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const host = process.env.HOST
const authRouter = require('./router/auth')
const dashboardRouter = require('./router/dashboard')
const childBioRouter = require('./router/childBio')
const bookmarkRouter = require('./router/bookmark')

app.use(express.json())
app.use(cors())

// router

app.use('/', authRouter)
app.use('/', dashboardRouter)
app.use('/', childBioRouter)
app.use('/', bookmarkRouter)


app.listen(port, host, () => {
    console.log(`Server running on port ${port}`)
})

