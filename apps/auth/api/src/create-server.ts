import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth-router";

const env = process.env.NODE_ENV?.toUpperCase() ?? "Env Not Found";

export const createServer = async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());

  // Static files middleware
  // app.use(express.static(config.root + '/public'));

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.get("/", (req, res) => {
    res.send(`Auth API Health Status: SUCCESS!! Env: ${env}`);
  });

  app.use(authRouter);

  app.use((err: string, req: Request, res: Response, next: NextFunction) => {
    // removing the unused next function will cause tests to fail
    console.log(err);

    return res.status(400).json(err);
  });

  return app;
};
