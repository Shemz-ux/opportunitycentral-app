const {MongoClient} = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'opportunitycentral-test';

let db;

const connection = async () => {
    return MongoClient.connect(uri)
    .then(client => {
        console.log('✅ MongoDB connection successful!');
        db = client.db(dbName);
        return db;
    })
    .catch(error => {
        console.error('❌ MongoDB connection failed!', error);
    });
};

module.exports = connection;
