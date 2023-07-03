import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  // generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    domain: process.env.ALLOWED_ORIGIN,
    httpOnly: true, // can not be accessed by javascript on client side
    secure: process.env.NODE_ENV !== "developement", // secure flag will be active for production
    sameSite: "none", // Setting it to "strict" ensures that the cookie is only sent in requests originating from the same site.
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
