const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { jwtDecode } = require("jwt-decode");

function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");

    // get token from array (index 1)
    const bearerToken = bearer[1];

    // set token
    req.token = bearerToken;

    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({ message: "Unauthenticated" });
  }
}

const CheckUser = (req, res, next) => {
  try {
    const token = jwtDecode(req.token);
    console.log(token.role);

    if (token.role !== "super") {
      return res.status(403).json({ message: "Permission Denied" });
    }

    // If the token role is "super", continue to the next middleware/route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyToken, CheckUser };
