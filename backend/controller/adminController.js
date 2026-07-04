import pool from "../config/db.js";

import bcrypt from "bcrypt";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const totalStores = await pool.query(
      "SELECT COUNT(*) FROM stores"
    );

    const totalRatings = await pool.query(
      "SELECT COUNT(*) FROM ratings"
    );

    res.status(200).json({
      totalUsers: Number(totalUsers.rows[0].count),
      totalStores: Number(totalStores.rows[0].count),
      totalRatings: Number(totalRatings.rows[0].count)
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        address,
        role,
        created_at
      FROM users
      ORDER BY id`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE
        LOWER(name) LIKE LOWER($1)
        OR LOWER(email) LIKE LOWER($1)
        OR LOWER(address) LIKE LOWER($1)
        OR LOWER(role) LIKE LOWER($1)
      ORDER BY id`,
      [`%${search}%`]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



export const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        message: "All fields are required"
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
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES($1,$2,$3,$4,$5)`,
      [
        name,
        email,
        hashedPassword,
        address,
        role
      ]
    );

    res.status(201).json({
      message: "User added successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


export const getStores = async (req, res) => {
  try {

    const stores = await pool.query(`
      SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        users.name AS owner_name
      FROM stores
      LEFT JOIN users
      ON stores.owner_id = users.id
      ORDER BY stores.id
    `);

    res.json(stores.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const addStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    await pool.query(
      `
      INSERT INTO stores(name,email,address,owner_id)
      VALUES($1,$2,$3,$4)
      `,
      [
        name,
        email,
        address,
        owner_id
      ]
    );

    res.json({
      message: "Store Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const searchStores = async (req, res) => {
  try {

    const { search } = req.query;

    const stores = await pool.query(
      `
      SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        users.name AS owner_name
      FROM stores
      LEFT JOIN users
      ON stores.owner_id = users.id
      WHERE
      stores.name ILIKE $1 OR
      stores.email ILIKE $1 OR
      stores.address ILIKE $1
      ORDER BY stores.id
      `,
      [`%${search}%`]
    );

    res.json(stores.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must be 8-16 characters, include at least one uppercase letter and one special character" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, id]);

    res.json({ message: "User password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};