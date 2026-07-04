import pool from "../config/db.js";

export const getAllStores = async (req, res) => {
  try {

    const userId = req.user.id;
    const { search, sort, order, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page) || 1;
    const lim = parseInt(limit) || 10;

    let params = [userId];

    let whereClause = "";
    if (search) {
      params.push(`%${search}%`);
      const idx = params.length;
      whereClause = `WHERE s.name ILIKE $${idx} OR s.address ILIKE $${idx}`;
    }

    let orderBy = "ORDER BY s.id";
    if (sort) {
      const col = sort === "name" ? "s.name" : sort === "address" ? "s.address" : sort === "rating" ? "average_rating" : "s.id";
      const ord = order && order.toUpperCase() === "DESC" ? "DESC" : "ASC";
      orderBy = `ORDER BY ${col} ${ord}`;
    }

    // add pagination params
    params.push(lim);
    params.push((pageNum - 1) * lim);
    const limitIdx = params.length - 1; // lim index
    const offsetIdx = params.length; // offset index

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

      ${whereClause}

      GROUP BY s.id
      ${orderBy}
      LIMIT $${limitIdx} OFFSET $${offsetIdx}
      `,
      params
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