const dbService = require('../services/database.service')

/**
 * Basic CRUD functions
 */

module.exports = {
  async createDocument (req, res) {
    try {
      const collectionName = req.params.collection
      const data = req.body
      let result
      if (data.length) {
        result = await dbService.insertDocumentsInCollection(collectionName, data)
      } else {
        result = await dbService.createDocumentInCollection(collectionName, data)
      }
      res.json(result)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  },
  async readCollection (req, res) {
    try {
      const collectionName = req.params.collection
      const query = req.query
      const data = await dbService.getDocumentsFromCollection(collectionName, query)
      res.json(data)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  },
  async findLatest (req, res) {
    try {
      const collectionName = req.params.collection
      const query = req.query
      const document = await dbService.findLatestDocument(collectionName, query)
      res.json(document)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  },
  async readDocument (req, res) {
    try {
      const collectionName = req.params.collection
      const documentId = req.params.id
      const document = await dbService.findDocumentById(collectionName, documentId)
      res.json(document)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  },
  async updateDocument (req, res) {
    try {
      const collectionName = req.params.collection
      const documentId = req.params.id
      const updateData = req.body
      const result = await dbService.findDocumentByIdAndUpdate(collectionName, documentId, updateData)
      res.json(result)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  },
  async deleteDocument (req, res) {
    try {
      console.log(req.params);
      const collectionName = req.params.collection
      const documentId = req.params.id
      const result = await dbService.findDocumentByIdAndDelete(collectionName, documentId)
      res.json(result)
    } catch (error) {
      res.status(400).json({status: 'error', payload: error.message})
    }
  }
}
