import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { db } from "../config/db.mjs";

// Register User
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(403)
        .json({ message: "Email and password are required" });
    }

    const users = db.collection("user");

    // Check if user already exists
    const userExists = await users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await users.insertOne(newUser);
    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
      token,
      email,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const users = db.collection("user");

    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get User Profile

export const getUserProfile = async (req, res) => {
  try {
    const users = db.collection("userprofile");

    // Cast req.userId to ObjectId
    const userId = new ObjectId(req.userId);

    // Find user by ID
    const user = await users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      addr1: user.addr1,
      addr2: user.addr2,
      city: user.city,
      _state: user._state,
      zipcode: user.zipcode,
      email: user.email,
      updated: user.updated,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

export const createUserProfile = async (req, res) => {
  try {
    const users = db.collection("userprofile");
    // console.log(req.body);

    // Extract the form data from the request body
    const {
      firstName,
      lastName,
      phone,
      addr1,
      addr2,
      city,
      _state,
      zipcode,
      email,
      userId,
      updated, // userId should be part of the request (e.g., from JWT or session)
    } = req.body;
    // console.log("userId=>>>>>>>>>>>>>>>>>>>>>>>>>>>", userId);
    // Cast userId to ObjectId
    const objectId = new ObjectId(userId);

    // Find if the user already exists
    const user = await users.findOne({ _id: objectId });

    if (user) {
      // Update existing user profile
      await users.updateOne(
        { _id: objectId },
        {
          $set: {
            firstName,
            lastName,
            phone,
            addr1,
            addr2,
            city,
            _state,
            zipcode,
            email,
            updated,
          },
        }
      );
      return res
        .status(201)
        .json({ message: "User profile updated successfully" });
    } else {
      // Create new user profile
      await users.insertOne({
        _id: objectId,
        firstName,
        lastName,
        phone,
        addr1,
        addr2,
        city,
        _state,
        zipcode,
        email,
        updated,
      });
      return res
        .status(201)
        .json({ message: "User profile created successfully" });
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    res.status(500).json({
      message: "Error creating/updating user profile",
      error: error.message,
    });
  }
};
export const getPatient = async (req, res) => {
  try {
    const users = db.collection("user");

    // Convert the cursor to an array
    const userDetails = await users.find({}).toArray();

    res.status(200).json({ users: userDetails });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};
