import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {type: String,default: "common"},
    name: { type: String, required: true },
    idade: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, // Email único
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
