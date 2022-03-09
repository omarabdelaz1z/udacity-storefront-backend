CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  price money,
  category VARCHAR(20)
);

INSERT INTO products(name, price, category) VALUES('koolaid', 50, 'Drink Mix');
INSERT INTO products(name, price, category) VALUES('kitkat', 10, 'chocolate');
INSERT INTO products(name, price, category) VALUES('mandolin', 5, 'biscuits');
INSERT INTO products(name, price, category) VALUES('bake rolls', 3, 'snacks');
INSERT INTO products(name, price, category) VALUES('flamenko', 2, 'snacks');
INSERT INTO products(name, price, category) VALUES('biskrem', 5, 'biscuits');