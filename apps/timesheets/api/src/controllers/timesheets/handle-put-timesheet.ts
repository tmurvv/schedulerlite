// src/controllers/timesheets/handle-put-timesheet.ts
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getDb} from "../../db";
import {isTypeOfWork} from "@schedulerlite/shared/src";

const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
};

export const handlePutTimesheet = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    // Preflight support (local + prod safety)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: "",
        };
    }

    const timesheetId = event.path.split("/").pop();
    if (!timesheetId || !event.body) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({error: "Missing timesheet id or body"}),
        };
    }

    const {
        userId,
        projectId,
        start,
        end,
        lunchInMinutes,
        typeOfWork,
        notes,
    } = JSON.parse(event.body);

    if (
        !userId ||
        !projectId ||
        !start ||
        !end ||
        !isTypeOfWork(typeOfWork)
    ) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({error: "Invalid or missing required fields"}),
        };
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
            $setOnInsert: {
                id: timesheetId,
                createdOn: now,
            },
        },
        {upsert: true, returnDocument: "after"},
    );

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(result),
    };
};
