const checkRole = (...roles) => {
  return (req, res, next) => {

    console.log("ROLES REQUIRED:", roles);
    console.log("USER OBJECT:", req.user);
    console.log("USER ROLE TYPE:", typeof req.user.role);
    console.log("USER ROLE VALUE:", `[${req.user.role}]`);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  };
};

export default checkRole;