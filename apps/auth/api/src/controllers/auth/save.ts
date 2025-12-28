import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { omit } from "lodash";
import type { QueryOptions, UpdateQuery } from "mongoose";

import { User } from "../../models/user-schema";
import type { IUser } from "../../models/user-schema";

const saveUser = async (userPayload: UpdateQuery<IUser>, res: Response) => {
  const email = String((userPayload as any).email ?? "");

  const options: QueryOptions = {
    returnDocument: "after",
    upsert: true,
  };

  const returnedUser = await User.findOneAndUpdate(
    { email },
    userPayload,
    options,
  );

  res.status(200).json({
    data: omit(returnedUser?.toObject?.() ?? returnedUser, ["__v", "_id"]),
    status: 200,
  });
};

export const save = async (req: Request, res: Response) => {
  try {
    const requestBody = (req.body ?? {}) as Record<string, unknown>;
    const password = requestBody.password;

    const { password: _ignoredPassword, ...rest } = requestBody;
    let userPayload: UpdateQuery<IUser> = { ...rest, ...req.params };

    if (typeof password === "string" && password.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      userPayload = { ...userPayload, password: hash } as UpdateQuery<IUser>;
    }

    await saveUser(userPayload, res);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Save user failed",
      status: 500,
    });
  }
};
