var sockets = {};
let cookiesQuantity = 128
/**
 * Initialization of socket io
 * @param {*} server 
 */
sockets.init = ( server ) => {
    /* socket.io setup */
    var io = require('socket.io').listen(server);
    // initialize modem interface
    io.sockets.on('connection', function (socket) {
      /* Create event listeners */
      console.log('connection');
      socket.on('subscribe_to_node', (nodeId, callback) => {
        let socketRooms = Object.keys(socket.rooms)
        socketRooms.forEach(room => {
          if (room !== socket.id && room !== nodeId) {
            socket.leave(room)
          }
        })
        
        if (!socketRooms.includes(nodeId)) {
          socket.join(nodeId)
          callback({status: 'success'})
        } else {
          callback({status: 'error', msg: `already subscribed to ${nodeId}`})
        }
      })
      require('./socket.routing')(socket)

      socket.on('eat_cookie', (callback) => {
        setTimeout(() => {
          callback({status: 'success'})
        }, 2000);
      })
    });
    return io
}

module.exports = sockets;
