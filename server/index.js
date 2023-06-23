import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import productRoutes from "./router/product.js";
import { connectToDatabase } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// database connection
connectToDatabase();

// app
const app = express();

// port
const PORT = process.env.PORT || 5000;

// cors
app.use(cors());

// routes
app.use("/api/products", productRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
