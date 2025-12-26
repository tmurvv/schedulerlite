// src/controllers/users/handle-get-users.ts
import { getDb } from "../../db";

export const handleGetUsers = async () => {
  const db = await getDb();
  const users = await db.collection("users").find({}).toArray();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(users),
  };
};
