// src/controllers/timesheets/handle-get-timesheets.ts
import {getDb} from "../../db";

export const handleGetTimesheets = async () => {
    const db = await getDb();
    const timesheets = await db.collection("timesheets").find({}).toArray();

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(timesheets),
    };
};
