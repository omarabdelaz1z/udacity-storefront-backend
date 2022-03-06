import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../index";
import { generateToken } from "../utils/general";

const request = supertest(app);

describe("POST /api/products/", () => {
  it("POST /api/products - valid params and supplied token - works", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .post("/api/products")
      .send({
        name: "kataketo",
        price: 4,
        category: "chocolate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  it("POST /api/products - missing name - fails", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .post("/api/products")
      .send({
        price: 4,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("POST /api/products - missing category - works", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .post("/api/products")
      .send({
        name: "kataketo",
        price: 4,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  it("POST /api/products - valid params and missing token - do not work", async () => {
    const response = await request.post("/api/products").send({
      name: "kataketo",
      price: 4,
      category: "chocolate",
    });

    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("GET /api/products/", () => {
  it("GET /api/products - works", async () => {
    const response = await request.get("/api/products/");

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});

describe("GET /api/products/:id", () => {
  it("GET /api/products/1 - found", async () => {
    const response = await request.get("/api/products/1");

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("GET /api/products/101 - not found", async () => {
    const response = await request.get("/api/products/101");

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it("GET /api/products/a - incorrect", async () => {
    const response = await request.get("/api/products/a");

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
