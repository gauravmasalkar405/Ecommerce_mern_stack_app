import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../Models/product.js";

// fetch all products , pagination implementation
const getProducts = asyncHandler(async (req, res) => {
  // define page size
  const pageSize = 4;

  // getting pageNumber from req
  const page = Number(req.query.pageNumber) || 1;

  // search keyword and mathching it with name in database using $refex query, $options query to make it case insensitive
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  // it will count all number of products available in mongo db
  const count = await Product.countDocuments({ ...keyword });

  // it will give only products equal to pageSize and products for tha particular page
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // const products = await Product.find({});
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // product
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
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

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// product review
const createProductReview = asyncHandler(async (req, res) => {
  const { user, rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // check if product is already reviewd by same user
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === user._id.toString()
    );
    if (alreadyReviewd) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment: comment,
      user: user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// fetch products indivisually
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopRatedProducts,
};
