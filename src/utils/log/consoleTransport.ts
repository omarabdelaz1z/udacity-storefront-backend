import winston, { format } from "winston";

const logFormat = format.printf(
  ({ level, message, timestamp }) =>
    `${
      process.env.NODE_ENV === "DEVELOPMENT" ? `[${timestamp}]` : ""
    } [${level}] ${message}`
);

export default new winston.transports.Console({
  level: process.env.NODE_ENV === "DEVELOPMENT" ? "debug" : "info",
  stderrLevels: ["errors"],
  consoleWarnLevels: ["warn"],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.colorize(),
    format.prettyPrint(),
    logFormat
  ),
});
