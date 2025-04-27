import { NextFunction, Response } from "express";
import { CustomRequest } from "./verifyToken";
import User from "../models/user.model";

export async function checkForAdmin(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const user = await User.findById(req.userId);

  if (user?.role !== "admin") {
    res.status(400).json({
      success: false,
      msg: "You are not authorized to do such operation",
    });
    return;
  }

  next();
}
