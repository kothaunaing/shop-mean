import { Request, Response } from "express";
import User from "../models/user.model";
import { compare, hash } from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { CreateUserType } from "../types/CreateUserType";
import { CustomRequest } from "../middlewares/verifyToken";

type LoginUserType = Omit<CreateUserType, "username">;

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginUserType;

    if (!email.trim() || !password.trim()) {
      res
        .status(400)
        .json({ success: false, msg: "Please fill all required fields" });

      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: false,
      token,
      msg: "Logged in successfully",
      user: {
        name: user.name,
        username: user.username,
        password: undefined,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log(`Error in loginController: ` + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function registerController(
  req: Request<
    {},
    {},
    { username: string; email: string; password: string; name: string }
  >,
  res: Response
) {
  const { name, username, email, password } = req.body;

  try {
    if (!username.trim() || !email.trim() || !password.trim() || !name.trim()) {
      res
        .status(400)
        .json({ success: false, msg: "Please fill all required fields" });

      return;
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(400).json({ success: false, msg: "User already exists" });
      return;
    }

    const hashedPassword = await hash(password, 10);
    const verificationCode = Math.floor(Math.random() * 900000 + 100000);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    await user.save();
    const token = generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      success: true,
      token,
      msg: "Registered successfully",
      user: {
        name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        password: undefined,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log("Error in registerController: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function checkAuth(req: CustomRequest, res: Response) {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(400).json({ success: false, msg: "No user found" });
    return;
  }

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    },
  });
}

export async function logoutController(req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ success: false, msg: "Logged out successfully" });
}
