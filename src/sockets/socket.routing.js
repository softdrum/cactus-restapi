const SensorService = require('../services/sensor.service');
const HOUR = 36e5
module.exports = (socket) => {
  socket.on('water', (nodeId, callback) => {
    socket.to(nodeId).emit('water', {status: 'watering'})
    setTimeout(() => {
      socket.to(nodeId).emit('water', {status: 'success'})
      callback('wate')
    }, 2000);
  })
  socket.on('sensor_data', async data => {
    socket.join(data.nodeId)
    socket.to(data.nodeId).emit('new_data', data)
    try {
      let now = new Date()
      let lastMongoPost = await SensorService.findLatestDocument({nodeId: data.nodeId})
      if (!lastMongoPost) {
        await SensorService.createDocument(data);
      } else {
        let diff = now - lastMongoPost.createdAt
        if (diff >= HOUR) {
          await SensorService.createDocument(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('new_master_node', id => {
    socket.nodeId = id
  })
  socket.on('connected_slave_nodes', arr => {
    socket.slaves =  arr.slice();
  })
}
