// src/controllers/timesheets/handle-put-timesheet.ts
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";

import {getDb} from "../../db";

export const handlePutTimesheet = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const timesheetId = event.path.split("/").pop();
    if (!timesheetId) {
        return {
            statusCode: 400,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({error: "Missing timesheet id"}),
        };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const db = await getDb();
    const now = new Date();

    const result = await db.collection("timesheets").findOneAndUpdate(
        {id: timesheetId},
        {
            $set: {...body, updatedOn: now},
            $setOnInsert: {id: timesheetId, createdOn: now},
        },
        {upsert: true, returnDocument: "after"},
    );

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(result),
    };
};
