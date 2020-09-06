/** Initialize express app */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('./router')(app, express) // adding routes


module.exports = app
