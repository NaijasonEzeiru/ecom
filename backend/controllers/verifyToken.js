const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "you are not authenticated" });
  }
};

exports.verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.is_admin) {
      next();
    } else {
      res.status(403).json("You are not authorised for this action");
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.is_admin) {
      next();
    } else {
      res.status(403).json("You are not authorised for this action");
    }
  });
};

exports.verifyToken = verifyToken;
