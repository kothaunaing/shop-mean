import { Request, Response } from "express";
import User from "../models/user.model";

const ITEMS_PER_PAGE = 10;

export async function getAllUsers(req: Request, res: Response) {
  try {
    const { page } = req.query as { page: string };

    const newPage = parseInt(page) || 1;

    const offset = (newPage - 1) * ITEMS_PER_PAGE;

    const users = await User.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .select("-password")
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalDocuments = await User.countDocuments();
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      msg: "Successfully fetched all users",
      totalUsers: totalDocuments,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage: newPage,
      itemsInCurrentPage: users.length,
      totalPages,
      users,
    });
  } catch (error: any) {
    console.log("Error in getAllUsers: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function getOnlineUsers(req: Request, res: Response) {
  try {
    const users = await User.find({ isOnline: true }).select(
      "isOnline _id lastOnline "
    );

    res.status(200).json({
      success: true,
      msg: "Successfully fetched all online users",
      users: users.map((user) => ({
        isOnline: user.isOnline,
        userId: user._id,
        lastOnline: user.lastOnline,
      })),
    });
  } catch (error: any) {
    console.log("Error in getOnlineUsers: " + error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}
