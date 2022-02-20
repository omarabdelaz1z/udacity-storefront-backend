import { Router } from "express";
import { findOrdersByUserIdHandler } from "../../controllers/OrderController";
import { isAuthorized } from "../../middlewares/auth";
import { validateOrderParams } from "../../middlewares/validate";

const orders = Router();

orders
  .route("/")
  .get(...[isAuthorized, validateOrderParams, findOrdersByUserIdHandler]);

export default orders;
