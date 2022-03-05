import { Router } from "express";


export type OrderStatus = "ACTIVE" | "COMPLETE";

export interface OrderResponse extends DatabaseResponse {
  items?: {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    quantity: number;
    status: OrderStatus;
  }[];
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
  };
}

export interface ModelResponse<T> extends DatabaseResponse {
  data?: T;
}

export interface ListModelResponse<T> extends DatabaseResponse {
  items?: T[];
}
