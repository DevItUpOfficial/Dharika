const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Structure should include userId, role, etc.
    } catch (err) {
      console.warn("Optional JWT Auth Failed:", err.message);
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

module.exports = optionalAuth;