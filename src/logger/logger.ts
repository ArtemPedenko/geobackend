import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      dirname: "error-logs",
      maxsize: 512000,
      maxFiles: 10,
    }),
  ],
});
export default logger;
