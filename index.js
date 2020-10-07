const app = require('./src/app');
const server = require('http').createServer(app);
const config = require('./src/config');
const mongo = require('./src/database');
const socketIO =require('./src/sockets');
/**
 * Main node js server app file
 */

server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
  mongo.init();
  socketIO.init(server);
})
  