import asyncHandler from "../middleware/asyncHandler.js";
import User from "../Models/user.js";
import generateToken from "../utils/generateToken.js";

// Authenticate user and get token
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ email });

  // matchPassword method from user model
  if (user && (await user.matchPassword(password))) {
    // generate token
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // if email already used
  const userExists = await User.findOne({ email });

  // if user exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // creating user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // generate token
    generateToken(res, user._id);

    // send user details as response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// logging out....
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Logged out successfully" });
});

// get user profile by id
export const getUserProfile = asyncHandler(async (req, res) => {
  // user from database
  const user = await User.findById(req.user._id);

  // send user as response
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  // find user by id
  const user = await User.findOne(req._id);

  // if user found
  if (user) {
    // update name and password
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.name;

    // update password
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save updated user
    const updatedUser = await user.save();

    // send updated user as response
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// get user by id
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User is not found");
  }
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "User updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
