import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

export const connect = async () => {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connected to MongoDB');
    return client.db('prueba_inversion_dependencias');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    return null;
  }
};