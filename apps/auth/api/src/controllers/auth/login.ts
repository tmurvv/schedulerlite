import "dotenv/config";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { User } from "../../models/user-schema";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const found: InstanceType<typeof User> | null = await User.findOne({
    email: req.body.email,
  });

  if (!found) {
    console.log("in login not found");
    return next("Email not found.");
  }

  found.comparePasswords(req.body.password, function (err, isMatch) {
    if (isMatch) {
      // const token = jwt.sign(
      //   { id: found.id, role: "user" },
      //   "Why cant I get my secret from dot env"
      // );
      const payload = {
        id: found.id,
        email: found.email,
        firstname: found.firstname,
        lastname: found.lastname,
        credentials: {
          userRoles: found.userRoles,
        },
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET ?? "secret not found",
        {
          expiresIn: "90d", // Set the expiration time as needed
        },
      );
      // Cookies.set("jwt", token, {
      //   expires: 1, // Expires in 1 day
      //   sameSite: "strict", // Strict same-site policy
      //   secure: process.env.NODE_ENV === "local", // Set secure flag based on environment
      // });

      // res.redirect(`http://localhost:5174?tkn=${token}`);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ status: "success", data: found.set(found), token });
    } else {
      return next("Password does not match our records.");
    }
  });
};
