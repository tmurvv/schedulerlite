import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path } = event;

  //
  // -----------------------------
  // 1. HEALTH CHECK
  // -----------------------------
  //
  if (httpMethod === "GET" && path === "/health") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Welcome to scheduler-lite API. Status: OK",
      }),
    };
  }

  //
  // -----------------------------
  // 2. CREATE TIMESHEET (v1)
  // POST /v1/timesheet
  // -----------------------------
  //
  if (httpMethod === "POST" && path === "/v1/timesheet") {
    try {
      const requestBody = event.body ? JSON.parse(event.body) : {};

      return {
        statusCode: 201,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Timesheet received",
          data: requestBody,
        }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }
  }

  //
  // -----------------------------
  // 3. FALLBACK 404
  // -----------------------------
  //
  return {
    statusCode: 404,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Route not found: ${httpMethod} ${path}`,
    }),
  };
};
