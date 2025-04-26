import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface JWtPayload {
  userId: string;
}

export interface CustomRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  try {
    if (!token) {
      res.status(401).json({ success: false, msg: "Unauthorized - no token" });
      return;
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JWtPayload;

    if (!decoded) {
      res
        .status(401)
        .json({ success: false, msg: "Unauthorized - invalid token" });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    console.log("Error in verify Token: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server errror" });
  }
};
