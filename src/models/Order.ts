import { StatusCodes } from "http-status-codes";
import {
  Order,
  OrderResponse,
  OrderRow,
  OrderStatus,
} from "../types/interfaces";
import pool from "../utils/database";
import logger from "../utils/log/logger";

const prepareOrder = ({ name, price, quantity, total }: OrderRow) => {
  return {
    name,
    price,
    quantity,
    total,
  };
};

const prepareOrders = (resultSet: OrderRow[], userId: number): Order[] => {
  const orders: Order[] = [];
  const ids: number[] = [...new Set(resultSet.map((o) => o.id))];

  ids.forEach((id) => {
    const intermediate = resultSet.filter((o) => o.id === id);

    orders.push({
      id,
      userId,
      status: intermediate[0].status,
      products: resultSet.filter((o) => o.id === id).map(prepareOrder),
    });
  });

  return orders;
};

export const findOrdersByUserId = async (
  id: number,
  status: OrderStatus | null
): Promise<OrderResponse> => {
  try {
    const resultSet = await pool.query(
      `
      SELECT
        o.id,
        o.status,
        p.name,
        p.price::numeric,
        op.quantity,
        (op.quantity * p.price)::numeric AS total
  
      FROM orders o 
        INNER JOIN order_products op ON o.id = op.order_id
        INNER JOIN products p ON op.product_id = p.id
  
      WHERE o.id IN 
        (
          SELECT o.id 
          FROM users u INNER JOIN orders o ON o.user_id = u.id
          WHERE u.id = COALESCE($1, u.id) AND o.status = COALESCE($2, o.status)
        )
      GROUP BY o.id, o.status, p.name, p.price, op.quantity, total`,
      [id, status]
    );

    return { items: prepareOrders(resultSet.rows, id) };
  } catch (err) {
    logger.error(`Error while fetching orders data due to ${err}`);

    return {
      error: {
        message: `Couldn't fetch ${status} orders with id ${id} orders data due to ${err}`,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};
