import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
} from "../controllers/product.js";

// get products route
router.get("/", getProducts);

// create product
router.post("/:id", createProduct);

// get product by id route
router.get("/:id", getProductsById);

// update product
router.put("/:id", updateProduct);

export default router;
