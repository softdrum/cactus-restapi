const databaseService = require('./database.service');
const {
  normalizeDatasetsForLineChart,
  convertDataArrayToObject
 } = require('../helpers/sensor.service.helpers');;

const COLLECTION_NAME = 'sensorsData';

class SensorDataService {
  createDocument(data) {
    return databaseService.createDocumentInCollection(COLLECTION_NAME, data)
  }
  insertMany(data) {
    return databaseService.insertDocumentsInCollection(COLLECTION_NAME, data)
  }
  async getSensorData(query) {
    let data = await databaseService.getDocumentsFromCollection(COLLECTION_NAME, query)
    let { datasetsObject, timeLabels } = convertDataArrayToObject(data);
    let datasets = normalizeDatasetsForLineChart(datasetsObject);
    return {
      labels: timeLabels,
      datasets
    }
  }
  findDocumentByIdAndDelete(id) {
    return databaseService.findDocumentByIdAndDelete(COLLECTION_NAME, id)
  }
  deleteMany (query) {
    return databaseService.deleteMany(COLLECTION_NAME, query)
  }
  findLatestDocument (query) {
    return databaseService.findLatestDocument(COLLECTION_NAME, query)
  }
 
}

module.exports = new SensorDataService();
