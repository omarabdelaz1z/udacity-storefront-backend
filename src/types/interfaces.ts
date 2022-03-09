import { Router } from "express";

export type JwtPayload = string | object | Buffer;

export interface OrderRow {
  id?: number;
  status?: OrderStatus;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

export type OrderStatus = "ACTIVE" | "COMPLETE";

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  products: {
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
}

export interface OrderResponse extends DatabaseResponse {
  items?: Order[];
}

export interface Route {
  name: string;
  router: Router;
}

export interface JoiValidationError {
  key: string;
  label: string;
  message: string;
  value: unknown | undefined;
}

export interface DatabaseResponse {
  error?: {
    message: string;
    status: number;
  };
}

export interface ModelResponse<T> extends DatabaseResponse {
  data?: T;
}

export interface ListModelResponse<T> extends DatabaseResponse {
  items?: T[];
}
