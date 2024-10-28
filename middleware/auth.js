require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};
