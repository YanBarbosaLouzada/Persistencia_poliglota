import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model("user", productShema);