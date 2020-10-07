const collections = require('../database/models');


module.exports = {
  async createDocumentInCollection (collectionName, data) {
    let document = new collections[collectionName](data)
    return document.save()
  },
  insertDocumentsInCollection (collectionName, data) {
    return collections[collectionName].insertMany(data)
  },
  getDocumentsFromCollection (collectionName, query) {
    return new Promise((resolve, reject) => {
      collections[collectionName].find(query, (err, docs) => {
        if (err) reject(err)
        else resolve(docs)
      })
    })
  },
  findLatestDocument (collectionName, query) {
    return new Promise((resolve, reject) => {
      collections[collectionName].findOne({}, {}, {
        sort: {'createdAt' : '-1'},
        ...query
      }, (err, doc) => {
        if (err) reject(err)
        else resolve(doc)
      })
    })
  },
  findDocumentById (collectionName, id) {
    return new Promise((resolve, reject) => {
      collections[collectionName].findById(id, (err, doc) => {
        if (err) reject(err)
        else resolve(doc)
      })
    })
  },
  findDocumentByIdAndUpdate (collectionName, id, updateData) {
    return new Promise((resolve, reject) => {
      collections[collectionName].findByIdAndUpdate(id, {$set: updateData}, (err, doc) => {
        if (err) reject(err)
        else resolve({status: doc})
      })
    })
  },
  findDocumentByIdAndDelete (collectionName, id) {
    return new Promise((resolve, reject) => {
      collections[collectionName].findByIdAndDelete(id, (err, doc) => {
        if (err) reject(err)
        else resolve(doc)
      })
    })
  },
  deleteMany (query) {
    return collections[collectionName].deleteMany(query)
  }
}
