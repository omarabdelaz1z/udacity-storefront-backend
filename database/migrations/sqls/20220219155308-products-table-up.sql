/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  price money,
  category VARCHAR(20)
);
