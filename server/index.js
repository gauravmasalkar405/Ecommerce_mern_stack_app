import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import products from "./data/product.js";
import { connectToDatabase } from "./config/db.js";

// database connection
connectToDatabase();

// app
const app = express();

// port
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
