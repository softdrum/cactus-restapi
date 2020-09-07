const collections = require('../database/models');


module.exports = {
  createDocumentInCollection (collectionName, data) {
    console.log(collectionName);
    const document = new collections[collectionName](data)
    return document.save()
  },
  insertDocumentsInCollection (collectionName, data) {
    return new Promise((resolve, reject) => {
      collections[collectionName].insertMany(data, (err, docs) => {
        if (err) reject(err)
        else resolve({status: 'success', data: docs.length})
      })
    })
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
      console.log(query);
      collections[collectionName].findOne({}, {}, {sort: {'updatedAt' : '-1'}, ...query}, (err, doc) => {
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
  
}
