## Udacity: Storefront Backend

A RESTful API that an online store exposes to serve the frontend.

> The API documentation and database schema can be found at [REQUIREMENTS](REQUIREMENTS.md)

### Instructions

It is expected to run `npm install` first before executing any of the scripts below.

#### Scripts
- eslint: `npm run lint`
- prettier: `npm run format`
- development: `npm run dev`
- test: `npm run test`
- production: `npm run start`
- build: `npm run build`

### sample dotenv

NOTE: These variables are only used for development/testing purposes.

```env
NODE_ENV=DEVELOPMENT
PORT=5000

DB_NAME=storefront
DB_NAME_TEST=storefront_test
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=admin

JWT_ACCESS=straycats
JWT_ACCESS=straycatsarecool

SALT_ROUNDS=10
PEPPER=SANCTUARY
```

### API Endpoints

Kindly find them at [REQUIREMENTS](REQUIREMENTS.md).

Note: You need to attach `authorization` in the request headers to access the routes:
- `Authorization: Bearer <token>`


