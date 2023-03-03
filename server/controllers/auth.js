import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { userFileUpload } from "../uploadImage.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      picture,
      friends,
      location,
      occupation,
    } = req.body;

    const result = await userFileUpload(req);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, salt);
    // console.log(passwordHash)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      confirmPassword: confirmPasswordHash,
      picture: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    if (passwordHash === confirmPasswordHash) {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ err: "passwords are not the same" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ err: "user not found" });

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return res.status(400).json({ err: "password does not match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
