module.exports = {
    port: process.env.PORT || 8081,
    db: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/ConnectionTest'
    },
}
