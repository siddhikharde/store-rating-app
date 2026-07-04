import pool from "../config/db.js";

export const getAllStores = async (req, res) => {
  try {

    const stores = await pool.query(`
      SELECT
        stores.id,
        stores.name,
        stores.address,
        COALESCE(AVG(ratings.rating),0) AS average_rating
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      GROUP BY stores.id
      ORDER BY stores.id
    `);

    res.json(stores.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const rateStore = async (req, res) => {

  try {

    const {
      user_id,
      store_id,
      rating
    } = req.body;

    const exists = await pool.query(
      "SELECT * FROM ratings WHERE user_id=$1 AND store_id=$2",
      [user_id, store_id]
    );

    if (exists.rows.length > 0) {

      await pool.query(
        "UPDATE ratings SET rating=$1 WHERE user_id=$2 AND store_id=$3",
        [rating, user_id, store_id]
      );

      return res.json({
        message: "Rating Updated"
      });

    }

    await pool.query(
      "INSERT INTO ratings(rating,user_id,store_id) VALUES($1,$2,$3)",
      [rating, user_id, store_id]
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