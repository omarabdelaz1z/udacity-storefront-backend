CREATE TYPE order_status as ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users,
  product_id INT REFERENCES products,
  quantity INT,
  status order_status
);

INSERT INTO orders(user_id, product_id, quantity, status) VALUES(1, 1, 10, 'ACTIVE');
INSERT INTO orders(user_id, product_id, quantity, status) VALUES(2, 3, 4, 'ACTIVE');
INSERT INTO orders(user_id, product_id, quantity, status) VALUES(2, 3, 2, 'ACTIVE');
INSERT INTO orders(user_id, product_id, quantity, status) VALUES(2, 4, 1, 'COMPLETE');
INSERT INTO orders(user_id, product_id, quantity, status) VALUES(1, 2, 3, 'ACTIVE');