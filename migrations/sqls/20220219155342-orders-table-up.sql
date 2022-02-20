/* Replace with your SQL commands */

CREATE TYPE order_status as ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  quantity INT,
  user_id INT REFERENCES users,
  status order_status
);