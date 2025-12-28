import "dotenv/config";
import { NextFunction, Request, Response } from "express";

import { User } from "../../models/user-schema";

export const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("in login", req.body);
  const found: InstanceType<typeof User> | null = await User.findOne({
    email: req.body.email,
  });

  if (!found) {
    console.log("in login not found");
    return next("Email not found.");
  } else {
    res.status(200).json({ status: 200, userExists: true });
  }
};
