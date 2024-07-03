import jwt from "jsonwebtoken";

// Send cookie helper
export const sendCookie = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};

// Error handling helper
export const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

// Helper function to validate URL
export const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};