import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: { type: String, required: false },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  phone: { type: String, required: true },
  isAdult: { type: Boolean, required: true },
  address: { type: String, required: true },
  preferences: {
    type: { type: String, required: false },
    size: { type: String, required: false },
    age: { type: String, required: false },
  },
});

export const userModel = mongoose.model("user", userSchema);