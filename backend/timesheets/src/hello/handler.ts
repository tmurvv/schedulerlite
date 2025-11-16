import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const message = "Hello from SchedulerLite";
  console.log(message);
  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
