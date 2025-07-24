// authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { db } from "../config/db.mjs";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header contains a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Connect to the database to fetch the user from the token's userId

      const user = await db
        .collection("user")
        .findOne({ _id: new ObjectId(decoded.userId) });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      // Attach the userId to the request object
      req.userId = decoded.userId;
      next(); // Call the next middleware
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is provided in the header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
