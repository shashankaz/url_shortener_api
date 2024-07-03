import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { handleErrors, sendCookie } from "../utils/helpers.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Register First",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged out Successfully",
      });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const profile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
