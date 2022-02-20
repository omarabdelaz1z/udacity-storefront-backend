import winston from "winston";
import consoleTransport from "./consoleTransport";

export default winston.createLogger({
  exitOnError: false,
  level: process.env.NODE_ENV === "DEVELOPMENT" ? "debug" : "info",
  transports: [consoleTransport],
});
