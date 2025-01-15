require('dotenv').config()
const express = require('express')
const router = require('./src/routes/routes')

const app = express()
const PORT = process.env.APP_PORT || 8080

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(PORT, () => console.log(`running on ${PORT}`))