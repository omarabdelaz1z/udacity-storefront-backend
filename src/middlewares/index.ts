import { Application, json } from "express";
import cors from "cors";
import morgan from "morgan";

const mount = (app: Application) => {
  app.use(json({ limit: "2mb" }));
  app.use(cors());
  app.use(morgan("dev"));
};

export default mount;
