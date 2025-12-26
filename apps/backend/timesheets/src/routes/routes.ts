// src/routes.ts
import {handleGetUsers, handlePutUser} from "../controllers/users";
import {
    handleGetTimesheets,
    handlePutTimesheet,
} from "../controllers/timesheets";

export const routeRequest = async ({
                                       event,
                                       httpMethod,
                                       path,
                                   }: {
    event: any;
    httpMethod: string;
    path: string;
}) => {
    if (httpMethod === "GET" && path === "/health") {
        return {statusCode: 200, headers: {"Content-Type": "application/json"}, body: JSON.stringify({status: "OK"})};
    }

    if (httpMethod === "GET" && path === "/v1/users") {
        return handleGetUsers();
    }

    if (httpMethod === "PUT" && path.startsWith("/v1/users/")) {
        return handlePutUser(event);
    }

    if (httpMethod === "GET" && path === "/v1/timesheets") {
        return handleGetTimesheets();
    }

    if (httpMethod === "PUT" && path.startsWith("/v1/timesheets/")) {
        return handlePutTimesheet(event);
    }

    return {statusCode: 404, headers: {"Content-Type": "application/json"}, body: JSON.stringify({error: `Route not found: ${httpMethod} ${path}`})};
};
