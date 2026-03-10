const logger = (req, res, next) => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  const method = req.method;       // GET, POST, DELETE, etc.
  const url = req.originalUrl;     // /user, /products, etc.

  console.log(`${time} ${method} ${url}`);
  // Example output → 10:30:22 GET /user

  next(); // Pass control to the next handler
};

module.exports = logger;