import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export function generateTokenAndSetCookie(
  userId: Types.ObjectId,
  res: Response
) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   sameSite: "strict",
  // });

  return token;
}
