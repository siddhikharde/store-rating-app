import pool from "../config/db.js";

export const getAllStores = async (req, res) => {
  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,

        COALESCE(AVG(r.rating),0) AS average_rating,

        (
          SELECT rating
          FROM ratings
          WHERE user_id=$1
          AND store_id=s.id
        ) AS user_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id=r.store_id

      GROUP BY s.id
      ORDER BY s.id
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const rateStore = async (req, res) => {

  try {

    const userId = req.user.id;

    const { store_id, rating } = req.body;

    const exists = await pool.query(
      "SELECT * FROM ratings WHERE user_id=$1 AND store_id=$2",
      [userId, store_id]
    );

    if (exists.rows.length > 0) {

      await pool.query(
        "UPDATE ratings SET rating=$1 WHERE user_id=$2 AND store_id=$3",
        [rating, userId, store_id]
      );

      return res.json({
        message: "Rating Updated"
      });

    }

    await pool.query(
      "INSERT INTO ratings(rating,user_id,store_id) VALUES($1,$2,$3)",
      [rating, userId, store_id]
    );

    res.json({
      message: "Rating Submitted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};