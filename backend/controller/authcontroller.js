import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import crypto from "crypto";

// In-memory token store: token -> { userId, expires }
const resetTokens = new Map();

export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Basic server-side validations
    if (!name || !email || !password || !address) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (typeof name !== "string" || name.trim().length < 20 || name.trim().length > 60) {
      return res.status(400).json({
        message: "Name must be between 20 and 60 characters"
      });
    }

    if (typeof address !== "string" || address.trim().length > 400) {
      return res.status(400).json({
        message: "Address must be at most 400 characters"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address"
      });
    }

    // Password: 8-16 chars, at least one uppercase, one special char
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be 8-16 characters, include at least one uppercase letter and one special character"
      });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users(name,email,password,address)
       VALUES($1,$2,$3,$4)`,
      [name, email, hashedPassword, address]
    );

    res.status(201).json({
      success:true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success:false,
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success:true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success:false,
      message: "Server Error"
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "New password must be 8-16 characters, include at least one uppercase letter and one special character" });
    }

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, userId]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour

    resetTokens.set(token, { userId: user.id, expires });

    const frontendUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
    const link = `${frontendUrl}/reset-password?token=${token}`;

    console.log(`Password reset token for user ${user.email}: ${token}`);

    return res.json({ message: "Password reset token generated", token, link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const record = resetTokens.get(token);
    if (!record || record.expires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "New password must be 8-16 characters, include at least one uppercase letter and one special character" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, record.userId]);

    resetTokens.delete(token);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};