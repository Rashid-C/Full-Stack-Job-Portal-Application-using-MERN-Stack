import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String,
  },
  image: {
    type: String,
    Request: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
