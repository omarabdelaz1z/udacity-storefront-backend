import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../index";

const request = supertest(app);

describe("User Controller Suite /api/users/", () => {
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
