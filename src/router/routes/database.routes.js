const dbController = require('../../controllers/database.controller')
const cache = require('../../utils/memory.cache')

module.exports = (app) => {
  app.post('/api/database/:collection', dbController.createDocument)
  app.get('/api/database/:collection', cache(10), dbController.readCollection)
  app.get('/api/database/:collection/latest', dbController.findLatest)
  app.get('/api/database/:collection/:id', cache(10), dbController.readDocument)
  app.put('/api/database/:collection/:id', dbController.updateDocument)
  app.delete('/api/database/:collection/:id', dbController.deleteDocument)
}
