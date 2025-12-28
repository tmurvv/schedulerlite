// src/db.ts
import { MongoClient } from "mongodb";

let mongoClient: MongoClient | undefined;

export const getDb = async () => {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.DB_CONNECTION_STRING as string);
    await mongoClient.connect();
  }

  return mongoClient.db(process.env.DB_NAME);
};
