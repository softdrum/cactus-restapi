module.exports = {
    port: process.env.PORT || 8081,
    db: {
        url: process.env.DB_URL || 'mongodb+srv://cactus:cactus1441@cluster0.hgbq7.mongodb.net/<dbname>?retryWrites=true&w=majority'
    },
}
