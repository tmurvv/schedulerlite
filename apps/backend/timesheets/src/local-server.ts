import dotenv from "dotenv";
import express, {Request, Response} from "express";
import {MongoClient} from "mongodb";

import {handler} from "./handler";

dotenv.config({path: "../.env"});

const PORT = 8000;

const envName = String(process.env.ENV ?? "").toUpperCase();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

const resolveDbName = () => {
    if (envName === "DEV") {
        return process.env.DEV_DB;
    }
    if (envName === "STAGING") {
        return process.env.STAGING_DB;
    }
    if (envName === "PROD") {
        return process.env.PROD_DB;
    }
    return undefined;
};

const dbName = resolveDbName();

if (!dbConnectionString) {
    throw new Error("Missing env var: DB_CONNECTION_STRING");
}
if (!dbName || dbName === "NYI") {
    throw new Error(`Invalid/NYI database for ENV=${envName}`);
}

process.env.DB_NAME = dbName;

const mongoClient = new MongoClient(dbConnectionString);

type LambdaEvent = {
    httpMethod: string;
    path: string;
    headers: Record<string, unknown>;
    body: string | null;
    isBase64Encoded: boolean;
};

const buildLambdaEvent = (request: Request, requestBody: string): LambdaEvent => {
    return {
        httpMethod: request.method,
        path: request.originalUrl,
        headers: request.headers as Record<string, unknown>,
        body: requestBody ?? null,
        isBase64Encoded: false,
    };
};

const start = async () => {
    try {
        await mongoClient.connect();
        await mongoClient.db(dbName).command({ping: 1});

        // eslint-disable-next-line no-console
        console.log(`✅ MongoDB connection success (ENV=${envName}, db=${dbName})`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`🚫 MongoDB connection failed (ENV=${envName}, db=${dbName})`, error);
        process.exit(1);
    }

    const app = express();
    app.use(express.text({type: "*/*"}));

    app.use(async (request: Request, response: Response) => {
        try {
            const lambdaEvent = buildLambdaEvent(request, String(request.body ?? ""));
            const lambdaResult = await handler(lambdaEvent as any);

            if (lambdaResult.headers) {
                Object.entries(lambdaResult.headers).forEach(([headerName, headerValue]) => {
                    response.set(headerName, String(headerValue));
                });
            }

            response.status(lambdaResult.statusCode ?? 200).send(lambdaResult.body ?? "");
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error in local handler:", error);
            response.status(500).send("Internal server error (local)");
        }
    });

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`✅ Local Lambda harness running at http://localhost:${PORT}`);
    });
};

const shutdown = async () => {
    try {
        await mongoClient.close();
    } finally {
        process.exit(0);
    }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
