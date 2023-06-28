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

router.get("/", admin, getUsers);

router.post("/", registerUser);

router.post("/logout", logoutUser);

router.post("/login", authUser);

router.get("/profile", getUserProfile);

router.put("/profile", updateUserProfile);

router.delete("/:id", admin, deleteUser);

router.get("/:id", admin, getUserByID);

router.put("/:id", admin, updateUser);

export default router;
