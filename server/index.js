import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./router/product.js";
import userRoutes from "./router/user.js";
import { connectToDatabase } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// database connection
connectToDatabase();

// app
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// port
const PORT = process.env.PORT || 5000;

// cors
app.use(cors());

// product routes
app.use("/api/products", productRoutes);

// user routes
app.use("/api/users", userRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
