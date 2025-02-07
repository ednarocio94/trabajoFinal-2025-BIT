import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    image: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "Admin" },
  },
  { timestamps: true }
);

export const adminModel = mongoose.model("admin", adminSchema);