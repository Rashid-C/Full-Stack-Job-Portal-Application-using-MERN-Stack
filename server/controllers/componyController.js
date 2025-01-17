import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

// register a new compoy
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//compoly login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, validate both email and password are non-empty strings
    if (!email?.trim() || !password?.trim()) {
      return res.json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find company by email
    const company = await Company.findOne({ email });

    // Check if company exists
    if (!company) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    try {
      // Wrap bcrypt.compare in its own try-catch as it can throw if inputs are invalid
      const passwordMatch = await bcrypt.compare(password, company.password);

      if (!passwordMatch) {
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (bcryptError) {
      // If bcrypt.compare throws an error (which it can with invalid inputs)
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Only reach here if password matches
    return res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get compony data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });
    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get compony job applicats

export const getCompanyJobApplicants = async (req, res) => {};

//get comony posted jobs
export const getCompanyPostedJob = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });
    // todo: Adding no of applicants info in data

    res.json({ success: true, jobsData: jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job applic status
export const changeJobApplicationStatus = async (req, res) => {};

//change job visibility
export const changeVisiblity = async (req, res) => {};
