import { ListModelResponse, ModelResponse } from "../types/interfaces";
import pool from "../utils/database";
import logger from "../utils/log/logger";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const findProducts = async (): Promise<ListModelResponse<Product[]>> => {
  try {
    const client = await pool.connect();

    const resultSet = await client.query("SELECT * FROM products");

    client.release();
    return { items: resultSet.rows };
  } catch (err) {
    logger.error(`Error while fetching products data due to ${err}`);

    return {
      error: {
        message: `Error while fetching products data due to ${err}`,
      },
    };
  }
};

export const findProductById = async (
  id: number
): Promise<ModelResponse<Product>> => {
  try {
    const client = await pool.connect();

    const resultSet = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    client.release();
    return { data: resultSet.rows[0] };
  } catch (err) {
    logger.error(
      `Error while fetching products's data with id [${id}] due to ${err}`
    );

    return {
      error: {
        message: `Error while fetching products's data with id [${id}] due to ${err}`,
      },
    };
  }
};

export const addProduct = async (
  product: Partial<Product>
): Promise<ModelResponse<Product>> => {
  try {
    const client = await pool.connect();

    const resultSet = await client.query(
      "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id",
      [product.name, product.price, product.category]
    );

    client.release();
    return {
      data: {
        id: resultSet.rows[0].id,
        name: product.name,
        price: product.price,
        category: product?.category ?? null,
      },
    };
  } catch (err) {
    logger.error(
      `Error while inserting product (${product.name}, ${product.price}, ${product.category}) data into database due to ${err}`
    );

    return {
      error: {
        message: `Error while inserting product (${product.name}, ${product.price}, ${product.category}) data into database due to ${err}`,
      },
    };
  }
};
