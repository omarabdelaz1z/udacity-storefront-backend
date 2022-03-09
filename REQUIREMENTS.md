# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: 
  - [GET] `products`
- Show: 
  - [GET] `products/:id`
- Create [token required]: 
  - [POST] `products/`

#### Users

- Index [token required]:
  - [GET] `users/`
- Show [token required]:
  - [GET] `users/:id`
- Create: 
  - [POST] `users/`

#### Orders

- Current Order by user (args: user id)[token required]: 
  - [GET] `orders?userId=&status=(COMPLETE|ACTIVE)` 
  - [GET] `users/:id/orders?status=(COMPLETE|ACTIVE)` (optional route)
  - Example: `orders/userId=1&status=ACTIVE`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  price money,
  category VARCHAR(20)
);
```

#### User

- id
- firstName
- lastName
- password

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  password text
);
```

#### Orders

- id
- id of the user [FK]
- status of order (ACTIVE | COMPLETE)

```sql
CREATE TYPE order_status as ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT,
  status order_status,
  CONSTRAINT fk_user
	FOREIGN KEY(user_id)
		REFERENCES users(id)
);
```

#### Order Products
- id of the order [FK]
- id of the product [FK]
- quantity

```sql
CREATE TABLE IF NOT EXISTS order_products (
	order_id SERIAL,
	product_id SERIAL,
	quantity INT,
	PRIMARY KEY(product_id, order_id),

	CONSTRAINT fk_product
		FOREIGN KEY(product_id)
			REFERENCES products(id),
  
	CONSTRAINT fk_order
		FOREIGN KEY(order_id)
			REFERENCES orders(id)
);
```
