import { Router } from "express";
import {
  addProductHandler,
  findProductByIdHandler,
  findProductsHandler,
} from "../../controllers/ProductController";
import { isAuthorized } from "../../middlewares/auth";
import {
  validateProduct,
  validateProductParams,
} from "../../middlewares/validate";

const products = Router();

products
  .route("/")
  .get(findProductsHandler)
  .post(...[isAuthorized, validateProduct, addProductHandler]);

products.route("/:id").get(...[validateProductParams, findProductByIdHandler]);

export default products;
