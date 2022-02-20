import { Router } from "express";
import { findOrdersByUserIdHandler } from "../../controllers/OrderController";
import {
  addUserHandler,
  findUsersByIdHandler,
  findUsersHandler,
} from "../../controllers/UserController";
import { isAuthorized } from "../../middlewares/auth";
import { validateUser, validateUserParams } from "../../middlewares/validate";

const users = Router();

users
  .route("/")
  .get(...[isAuthorized, findUsersHandler])
  .post(...[validateUser, addUserHandler]);

users
  .route("/:id")
  .get(...[isAuthorized, validateUserParams, findUsersByIdHandler]);

users.get(
  "/:id/orders/",
  ...[isAuthorized, validateUserParams, findOrdersByUserIdHandler]
);

export default users;
