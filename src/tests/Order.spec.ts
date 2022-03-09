import { findOrdersByUserId } from "../models/Order";

describe("Order Model Suite: ", () => {
  it("Find Active Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, "ACTIVE");
    expect(response.items[0].status).toBe("ACTIVE");
  });

  it("Find Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, null);
    expect(response.items[0].userId).toBe(2);
  });

  it("Find Complete Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, "COMPLETE");
    expect(response.items[0].status).toBe("COMPLETE");
  });
});
