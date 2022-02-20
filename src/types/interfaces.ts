import { Router } from "express";

export interface Route {
  resource: string;
  router: Router;
}

export interface JoiValidationError {
  key: string;
  label: string;
  message: string;
  value: unknown | undefined;
}

export interface DatabaseError {
  status: number;
  message: string;
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
