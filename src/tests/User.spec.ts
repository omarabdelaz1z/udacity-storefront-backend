import { addUser, findUserById, findUsers } from "../models/User";
import pool from "../utils/database";
import { generateToken } from "../utils/general";

describe("User Model Suite: Insert", () => {
  it("create a user with auth", async () => {
    const response = await addUser({
      firstName: "FIRST_TEST",
      lastName: "LAST_TEST",
      password: "123",
    });

    const token = generateToken(response.data, process.env.JWT_ACCESS);
    expect(token).toBeDefined();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE first_name = $1", ["FIRST_TEST"]);
  });
});

describe("User Model Suite:GET", () => {
  it("get users", async () => {
    const response = await findUsers();

    expect(response.items[0].id).toEqual(1);
    expect(response.items[0].firstName).toEqual("Omar");
    expect(response.items[0].lastName).toEqual("Aziz");
  });

  it("get user of id 1", async () => {
    const response = await findUserById(1);

    expect(response.data.id).toEqual(1);
    expect(response.data.firstName).toEqual("Omar");
  });
});
