const jwt = require("jsonwebtoken");

module.exports = function isAuth(req, res, next) {
  const authHeaders = req.get("Authorization");
  if (!authHeaders) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeaders.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    err.status = 500;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error("Not authenticated");
    error.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;

  next();
};
