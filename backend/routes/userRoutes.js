import express from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authJWT from "../middleware/authJWT.js";

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ error: "User not found" });

  const passCheck = await bcrypt.compare(password, user.passwordHash);
  if (passCheck) {
    const payload = {id: user._id, email: user.email, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2m",
    });
    res.status(200).json({ user, token });

  } else res.status(401).json({ error: "Incorrect password" });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });

    console.log(newUser);
    await newUser.save();

    return res.status(201).json({ success: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});




// syntax for protected routes : router.get("/endpoint",authJWT,(req,res)=>{})

export default router;
