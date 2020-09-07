const app = require('./app')
const server = require('http').createServer(app)
const config = require('./config')

const mongo = require('./database')
mongo.init()
/**
 * Main node js server app file
 */
server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
})
  