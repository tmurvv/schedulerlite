// src/handler.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import {routeRequest} from "./routes/routes";

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const {httpMethod, path} = event;
  return routeRequest({event, httpMethod, path});
};
