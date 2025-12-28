import { Request, Response } from "express";

import { save } from "./save";

export const signup = async (req: Request, res: Response) => {
  req.body = { ...req.body, passwordChangedAt: new Date(), id: req.params.id };

  await save(req, res);
};
