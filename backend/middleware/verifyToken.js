    import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

   
    req.user = decoded;
     console.log("DECODED USER:", req.user);

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};

export default verifyToken;