import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopRatedProducts,
} from "../controllers/product.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// top rated products
router.get("/top", getTopRatedProducts);

// get products route
router.get("/", getProducts);

// create product
router.post("/:id", protect, admin, createProduct);

// get product by id route
router.get("/:id", getProductsById);

// update product
router.put("/:id", protect, admin, updateProduct);

// delete product by id
router.delete("/:id", protect, admin, deleteProduct);

// create product review
router.route("/:id/review").post(protect, admin, createProductReview);

export default router;
