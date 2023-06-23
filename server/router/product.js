import express from "express";
const router = express.Router();
import { getProducts, getProductsById } from "../controllers/product.js";

// get products route
router.get("/", getProducts);

// get product by id route
router.get("/:id", getProductsById);

export default router;
