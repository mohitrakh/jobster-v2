const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication failed");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, "jwtSecret");
    //  attack user to job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

module.exports = auth;
