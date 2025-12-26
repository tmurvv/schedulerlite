import {MongoClient} from "mongodb";

import {isAppRole} from "./enums/app-role";
import {isBusinessRole} from "./enums/business-role";

const ok = (body: unknown) => ({
  statusCode: 200,
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(body),
});

const badRequest = (message: string) => ({
  statusCode: 400,
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({error: message}),
});

const notFound = (route: string) => ({
  statusCode: 404,
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({error: `Route not found: ${route}`}),
});

const serverError = () => ({
  statusCode: 500,
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({error: "Internal server error"}),
});

const isDuplicateKeyError = (caught: unknown) => {
  if (!caught || typeof caught !== "object") {
    return false;
  }

  const errorObject = caught as {code?: unknown};
  return errorObject.code === 11000;
};

let mongoClient: MongoClient | undefined;

const getDb = async () => {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.DB_CONNECTION_STRING as string);
    await mongoClient.connect();
  }
  return mongoClient.db(process.env.DB_NAME);
};

export const handler = async (event: any) => {
  const {httpMethod, path} = event;

  if (httpMethod === "GET" && path === "/health") {
    return ok({status: "OK"});
  }

  if (httpMethod === "GET" && path === "/v1/users") {
    try {
      const db = await getDb();
      const users = await db.collection("users").find({}).toArray();
      return ok(users);
    } catch (error: unknown) {
      console.error("GET /v1/users failed:", error);
      return serverError();
    }
  }

  if (httpMethod === "PUT" && path.startsWith("/v1/users/")) {
    try {
      const userId = path.split("/").pop();
      if (!userId) {
        return badRequest("Missing user id");
      }

      const body = event.body ? JSON.parse(event.body) : {};
      const {firstName, lastName, email, businessRoles, appRoles} = body;

      if (!firstName || !lastName || !email) {
        return badRequest("Missing required fields");
      }

      if (!Array.isArray(businessRoles) || !businessRoles.every(isBusinessRole)) {
        return badRequest("Invalid businessRoles");
      }

      if (!Array.isArray(appRoles) || !appRoles.every(isAppRole)) {
        return badRequest("Invalid appRoles");
      }

      const now = new Date();
      const db = await getDb();

      const result = await db.collection("users").findOneAndUpdate(
          {id: userId},
          {
            $set: {
              firstName,
              lastName,
              email,
              businessRoles,
              appRoles,
              isActive: true,
              updatedOn: now,
            },
            $setOnInsert: {
              id: userId,
              createdOn: now,
            },
          },
          {upsert: true, returnDocument: "after"},
      );

      return ok(result);
    } catch (error: unknown) {
      if (isDuplicateKeyError(error)) {
        return badRequest("Email already in use");
      }

      console.error("PUT /v1/users failed:", error);
      return serverError();
    }
  }

  return notFound(`${httpMethod} ${path}`);
};
