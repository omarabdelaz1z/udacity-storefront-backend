import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../index";
import { generateToken } from "../utils/general";

const request = supertest(app);

describe("GET /api/orders?userId=?&status=?", () => {
  it("GET /api/orders?userId=2&status=ACTIVE", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .get("/api/orders?userId=2&status=ACTIVE")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("GET /api/orders?userId=2&status=COMPLETE", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );
    const response = await request
      .get("/api/orders?userId=2&status=COMPLETE")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("/api/orders?userId=2", async () => {
    const token = generateToken(
      {
        firstName: "Ahmed",
        lastName: "Tharwat",
        password: "123",
      },
      process.env.JWT_ACCESS
    );

    const response = await request
      .get("/api/orders?userId=2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});
