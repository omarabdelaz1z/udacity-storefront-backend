import express, { Application, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import api from "./routes/index";
import logger from "./utils/log/logger";
import mount from "./middlewares/index";

const app: Application = express();
const PORT = Number(process.env.PORT) || 3000;

// Mount Middlewares
mount(app);

app.use("/api", api);

app.get("/", (_: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("Storefront API");
});

app.listen(PORT, async () => {
  logger.info(`server listens on port ${PORT}`);
});
