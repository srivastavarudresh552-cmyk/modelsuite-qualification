const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlacklistedToken = require("../models/BlacklistedToken");
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const exists = await BlacklistedToken.findOne({ token });

      if (exists) {
        return res.status(401).json({ message: 'Session expired' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      req.token = token;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' }); // #6
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, adminOnly };
