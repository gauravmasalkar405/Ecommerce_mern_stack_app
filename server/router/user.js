import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", getUsers);

router.post("/", registerUser);

router.post("/logout", logoutUser);

router.post("/login", authUser);

router.get("/profile", getUserProfile);

router.put("/profile", updateUserProfile);

router.delete("/:id", deleteUser);

router.get("/:id", getUserByID);

router.put("/:id", updateUser);

export default router;
