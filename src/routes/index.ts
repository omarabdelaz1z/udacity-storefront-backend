import { Router } from "express";

import UserRouter from "./api/UserRouter";
import ProductRouter from "./api/ProductRouter";
import OrderRouter from "./api/OrderRouter";
import { Route } from "../types/interfaces";

const routes: Route[] = [
  {
    name: "/users",
    router: UserRouter,
  },
  {
    name: "/products",
    router: ProductRouter,
  },
  {
    name: "/orders",
    router: OrderRouter,
  },
];

const index = Router();

routes.forEach(({ name, router }) => index.use(name, router));

export default index;
