const sensorController = require('../../controllers/sensor.controller')

module.exports = (app) => {
    app.get('/api/sensor/:sensorId', sensorController.getSensorValue)
}