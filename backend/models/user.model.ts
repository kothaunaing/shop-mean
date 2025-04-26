import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    verificationCodeExpiresAt: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
