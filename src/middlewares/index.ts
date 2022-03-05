import { Application, json } from "express";
import cors from "cors";
import morgan from "morgan";

const mount = (app: Application) => {
  app.use(json({ limit: "2mb" }));
  app.use(cors());

  if (process.env.NODE_ENV === "DEVELOPMENT") app.use(morgan("dev"));
  else app.use(morgan("short"));
};

export default mount;
