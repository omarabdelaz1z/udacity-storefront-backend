import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../index";
import { generateToken } from "../utils/general";
import pool from "../utils/database";

const request = supertest(app);

describe("POST /api/users/", () => {
  it("POST /api/users", async () => {
    const response = await request.post("/api/users").send({
      firstName: "Ahmed",
      lastName: "Tharwat",
      password: "123",
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(response.body.token).toBeDefined();
  });

  it("POST /api/users with missing password", async () => {
    const response = await request.post("/api/users").send({
      firstName: "Ahmed",
      lastName: "Tharwat",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("POST /api/users with missing last name", async () => {
    const response = await request.post("/api/users").send({
      firstName: "Ahmed",
      password: "123",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});

describe("GET /api/users/", () => {
  it("GET /api/users - found", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("GET /api/users - missing token", async () => {
    const response = await request.get("/api/users");

    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("GET /api/users/:id", () => {
  it("GET /api/users/1 - found", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );
    const response = await request
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("GET /api/users/101 - not found", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .get("/api/users/101")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it("GET /api/users/a - incorrect", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .get("/api/users/a")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE id = 6");
  });
});
