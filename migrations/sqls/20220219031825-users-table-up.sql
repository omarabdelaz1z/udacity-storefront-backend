CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  password text
);


INSERT INTO users(first_name, last_name, password) VALUES('Omar', 'Aziz', '123');
INSERT INTO users(first_name, last_name, password) VALUES('Amr', 'Samy', '1234');
INSERT INTO users(first_name, last_name, password) VALUES('Mahmoud', 'Mohamed', '1235');
INSERT INTO users(first_name, last_name, password) VALUES('Mostafa', 'Mohamed', '1235');
INSERT INTO users(first_name, last_name, password) VALUES('Joe', 'Aziz', '1236');