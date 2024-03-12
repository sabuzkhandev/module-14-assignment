//Basic lib Import
const express = require('express')
const router = require('./src/route/api')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const mongoose = require('mongoose')
const app = new express()

//cors enable
app.use(cors())

//security Implementation
app.use(helmet())
app.use(hpp())
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))

//use limiter
const limiter = rateLimit({ windowMS: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// mongoDB database connection
let URL = ''
let OPTION = { user: '', pass: '', autoIndex: true }
mongoose
  .connect(URL, OPTION)
  .then((res) => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(err)
  })

// route implement
app.use('/api', router)

// route error message set
app.use('*', (req, res) => {
  res.status(404).json({ data: 'Not Found!' })
})

module.exports = app
