const SensorService = require('../services/sensor.service')

/**
 * Basic CRUD functions
 */
class SensorController {
  async create(req, res) {
    try {
      let data = req.body;
      let result = {status: 'OK'};
      if (data.length) {
        result = await SensorService.insertMany(data);
      } else {
        result = await SensorService.createDocument(data);
      }
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Unable to create document'})
    }
  }
  async read(req, res) {
    try {
      console.log('getting data');
      let query = req.query;
      let data = await SensorService.getSensorData(query);
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Unable to get sensor data'})
    }
  }
  async findLatest(req, res) {
    try {
      let query = req.query
      let document = await SensorService.findLatestDocument(query)
      res.json(document)
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Unable to get latest document'})
    }
  }
  async delete(req, res) {
    try {
      let result;
      if (req.query.id) {
        result = await SensorService.findDocumentByIdAndDelete(req.query.id);
      } else {
        result = await SensorService.deleteMany(query);
      }
      res.json(result)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  }
}

module.exports = new SensorController();