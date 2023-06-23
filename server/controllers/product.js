import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../Models/product.js";

// fetch all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// fetch products indivisually
export const getProductsById = asyncHandler(async (req, res) => {
  // req
  const id = req.params.id;

  // product of given id
  const product = await Product.findById(id);

  // if product presend then send it to the user
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
