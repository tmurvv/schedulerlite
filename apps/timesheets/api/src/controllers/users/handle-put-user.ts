// src/controllers/users/handle-put-user.ts
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";

import {getDb} from "../../db";

const isDuplicateKeyError = (error: unknown) =>
    typeof error === "object" && error !== null && (error as {code?: number}).code === 11000;

export const handlePutUser = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        const userId = event.path.split("/").pop();
        if (!userId) {
            return {statusCode: 400, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Missing user id"})};
        }

        const body = event.body ? JSON.parse(event.body) : {};
        const {firstName, lastName, email, businessRoles, appRoles} = body;
        if (!firstName || !lastName || !email) {
            return {statusCode: 400, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Missing required fields"})};
        }

        const db = await getDb();
        const now = new Date();
        const result = await db.collection("users").findOneAndUpdate(
            {id: userId},
            {$set: {firstName, lastName, email, businessRoles, appRoles, isActive: true, updatedOn: now}, $setOnInsert: {id: userId, createdOn: now}},
            {upsert: true, returnDocument: "after"},
        );

        return {statusCode: 200, headers: {"Content-Type": "application/json"}, body: JSON.stringify(result)};
    } catch (error: unknown) {
        if (isDuplicateKeyError(error)) {
            return {statusCode: 400, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Email already in use"})};
        }
        return {statusCode: 500, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Internal server error"})};
    }
};
