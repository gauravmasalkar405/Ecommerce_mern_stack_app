import dotenv from "dotenv";
import users from "./data/user.js";
import products from "./data/product.js";
import User from "./Models/user.js";
import Product from "./Models/product.js";
import Order from "./Models/order.js";
import { connectToDatabase } from "./config/db.js";

dotenv.config();

connectToDatabase();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`Errro: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// terminal commands
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
