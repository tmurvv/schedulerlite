// src/controllers/timesheets/handle-get-timesheets.ts
import {APIGatewayProxyResult} from "aws-lambda";
import {getDb} from "../../db";

export const handleGetTimesheets = async (): Promise<APIGatewayProxyResult> => {
    const db = await getDb();

    const timesheets = await db.collection("timesheets").aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "id",
                as: "user",
            },
        },
        {$addFields: {user: {$first: "$user"}}},
        {
            $project: {
                _id: 0,
                id: 1,
                userId: 1,
                projectId: 1,
                start: 1,
                end: 1,
                lunchInMinutes: 1,
                typeOfWork: 1,
                notes: 1,
                userFirstName: "$user.firstName",
                userLastName: "$user.lastName",
            },
        },
    ]).toArray();

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(timesheets),
    };
};
