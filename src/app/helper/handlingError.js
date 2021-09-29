module.exports = function handlingError(error, req, res, next) {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  return res.status(statusCode).json({ message: message, data: data });
};
