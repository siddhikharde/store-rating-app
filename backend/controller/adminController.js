import pool from "../config/db.js";

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