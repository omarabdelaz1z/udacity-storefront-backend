import { Router } from "express";

import UserRouter from "./api/UserRouter";
import ProductRouter from "./api/ProductRouter";
import OrderRouter from "./api/OrderRouter";
import { Route } from "../types/interfaces";

const routes: Route[] = [
  {
    resource: "/users",
    router: UserRouter,
  },
  {
    resource: "/products",
    router: ProductRouter,
  },
  {
    resource: "/orders",
    router: OrderRouter,
  },
];

const index = Router();

routes.forEach((r) => index.use(r.resource, r.router));

export default index;
