/** Initialize express app */
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./router') // adding routes

app.use(bodyParser.json())
app.use(cors({origin: '*'}));
app.use('/api', routes)

module.exports = app
