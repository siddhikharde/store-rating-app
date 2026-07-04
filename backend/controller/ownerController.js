import pool from "../config/db.js";

export const getOwnerDashboard = async (req, res) => {
  try {

    const ownerId = req.params.id;

    const result = await pool.query(
      `
      SELECT
        stores.id,
        stores.name,
        stores.address,
        COALESCE(AVG(ratings.rating),0) AS average_rating,
        COUNT(ratings.id) AS total_ratings
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      WHERE stores.owner_id = $1
      GROUP BY stores.id
      `,
      [ownerId]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};