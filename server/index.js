import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./router/product.js";
import userRoutes from "./router/user.js";
import orderRoutes from "./router/order.js";
import { connectToDatabase } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import uploadRoutes from "./router/upload.js";

// database connection
connectToDatabase();

// app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port
const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal route ---> client id will be sent to user using this route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// making upload folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error middlewares
app.use(notFound);
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
