// src/controllers/timesheets/handle-put-timesheet.ts
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getDb} from "../../db";
import {isTypeOfWork} from "../../enums/type-of-work";

export const handlePutTimesheet = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const timesheetId = event.path.split("/").pop();
    if (!timesheetId || !event.body) {
        return {statusCode: 400, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Missing timesheet id or body"})};
    }

    const {userId, projectId, start, end, lunchInMinutes, typeOfWork, notes} = JSON.parse(event.body);
    if (!userId || !projectId || !start || !end || !isTypeOfWork(typeOfWork)) {
        return {statusCode: 400, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: "Invalid or missing required fields"})};
    }

    const db = await getDb();
    const now = new Date();

    const result = await db.collection("timesheets").findOneAndUpdate(
        {id: timesheetId},
        {
            $set: {
                userId,
                projectId,
                start: new Date(start),
                end: new Date(end),
                lunchInMinutes,
                typeOfWork,
                notes,
                updatedOn: now,
            },
            $setOnInsert: {id: timesheetId, createdOn: now},
        },
        {upsert: true, returnDocument: "after"},
    );

    return {statusCode: 200, headers: {"Content-Type": "application/json"}, body: JSON.stringify(result)};
};
