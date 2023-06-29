import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../Models/product.js";

// fetch all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// fetch products indivisually
const getProductsById = asyncHandler(async (req, res) => {
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

// create product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.params.id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    // image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    // product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export { getProducts, getProductsById, createProduct, updateProduct };
