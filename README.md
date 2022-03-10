## Udacity: Storefront Backend

A RESTful API that an online store exposes to serve the frontend.

> The API documentation and database schema can be found at [REQUIREMENTS](REQUIREMENTS.md)

### Instructions

It is expected to run `npm install` first before executing any of the scripts below.

#### Database Setup

1. CREATE TWO DATABASES
```sql
-- development database
CREATE DATABASE storefront;

-- test database
CREATE DATABASE storefront_test;
```

2. GRANT PRIVILEGES
```sql
-- connect to storefront and grant privileges to `default_user`
\c storefront
GRANT ALL PRIVILEGES ON DATABASE storefront TO postgres

-- connect to storefront_test and grant privileges to `default_user` 
\c storefront_test
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO postgres
```
> place the proper configuration according to `.env` based on the keys existing in `database.json`

#### Scripts
- linting: `npm run lint`
- formatting: `npm run pretty`
- dev: `npm run dev`
- test: `npm run test`
- prod: `npm run start`
- migrate up: `npm run db:up`
- migrate down: `npm run db:down`

### sample dotenv

NOTE: These variables are only used for development/testing purposes.

ANOTHER NOTE: I need to write them down to pass the project in the nanodegree :thinking:

```env
NODE_ENV=DEVELOPMENT
PORT=5000
DB_NAME=storefront
DB_NAME_TEST=storefront_test
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin
JWT_ACCESS=straycats
SALT_ROUNDS=7
```

### API Endpoints

Kindly find them at [REQUIREMENTS](REQUIREMENTS.md).

Note: You need to attach `authorization` in the request headers to access the routes:
- `Authorization: Bearer <token>`


