const fs = require("fs");

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const logMessage = `${timestamp} ${req.method} ${req.url}\n`;

  fs.appendFile("access.log", logMessage, (err) => {
    if (err) {
      console.error("Error in Writing to the Log file:", err);
    }
  });
  next(); //go to the next middleware
};

module.exports = logger;
