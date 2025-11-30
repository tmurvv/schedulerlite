import express, { Request, Response } from "express";
// local-server is importing from src so as no
// to confuse TS. Code is built into dist
import { handler } from "./src/handler";

const app = express();
const port = 3000;

type LambdaEvent = {
    httpMethod: string;
    path: string;
    headers: Record<string, string | string[] | undefined>;
    body: unknown;
    isBase64Encoded: boolean;
};

const buildLambdaEvent = (
    request: Request,
    requestBody: unknown,
): LambdaEvent => {
    return {
        httpMethod: request.method,
        path: request.originalUrl,
        headers: request.headers,
        body: requestBody,
        isBase64Encoded: false,
    };
};

app.use(express.text({ type: "*/*" }));

app.use(async (request: Request, response: Response) => {
    try {
        const lambdaEvent = buildLambdaEvent(request, request.body);
        // this is only for local development so we are ok with an any type
        const lambdaResult = await handler(lambdaEvent as any);


        if (lambdaResult.headers) {
            Object.entries(lambdaResult.headers).forEach(
                ([headerName, headerValue]) => {
                    response.set(headerName, String(headerValue));
                },
            );
        }

        response
            .status(lambdaResult.statusCode ?? 200)
            .send(lambdaResult.body ?? "");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error in local handler:", error);
        response.status(500).send("Internal server error (local)");
    }
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Express Lambda dev server running at http://localhost:${port}`,
    );
});
