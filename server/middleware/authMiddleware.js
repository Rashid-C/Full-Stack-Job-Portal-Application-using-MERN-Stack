import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Not authorize, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
