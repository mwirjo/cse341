const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

let dbInstance;
let mongoClient;

const connectDB = async () => {
  if (dbInstance) return dbInstance;

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('MONGODB_URI and MONGODB_DB are required.');
  }

  mongoClient = new MongoClient(process.env.MONGODB_URI);
  await mongoClient.connect();
  dbInstance = mongoClient.db(process.env.MONGODB_DB);
  console.log('MongoDB Connected Successfully');
  return dbInstance;
};

const getDB = () => dbInstance;

module.exports = { connectDB, getDB };
