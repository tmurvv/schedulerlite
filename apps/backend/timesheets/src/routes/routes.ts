// src/routes.ts
import { handleGetUsers, handlePutUser } from "../controllers/users";
import {
  handleGetTimesheets,
  handlePutTimesheet,
} from "../controllers/timesheets";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
};

export const routeRequest = async ({
  event,
  httpMethod,
  path,
}: {
  event: any;
  httpMethod: string;
  path: string;
}) => {
  // 🔍 NEXT THING TO TRY: global preflight handling
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (httpMethod === "GET" && path === "/health") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ status: "OK" }),
    };
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

  return {
    statusCode: 404,
    headers: corsHeaders,
    body: JSON.stringify({ error: `Route not found: ${httpMethod} ${path}` }),
  };
};
