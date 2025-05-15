import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateAccessToken(user);

    if (!token) return res.status(500).json({ message: "An error occurred" });

    res
      .status(200)
      .cookie("accessToken", token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      })
      .json({
        success: true,
        message: "Login Successful",
        user: user,
        token,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    const newUser = await User.create({ email, password, fullName });

    if (!newUser)
      return res.status(500).json({ message: "Failed to create an user" });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const existingUser = await User.findById(user.id);

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: " User found successfully", user: existingUser });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
