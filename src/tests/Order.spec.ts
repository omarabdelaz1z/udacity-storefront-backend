import { findOrdersByUserId } from "../models/Order";

describe("Order Model Suite: ", () => {
  it("Find Active Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, "ACTIVE");

    expect(JSON.stringify(response)).toBe(
      JSON.stringify({
        items: [
          {
            id: 2,
            productId: 3,
            productName: "mandolin",
            quantity: 4,
            userId: 2,
            status: "ACTIVE",
          },
          {
            id: 3,
            productId: 3,
            productName: "mandolin",
            quantity: 2,
            userId: 2,
            status: "ACTIVE",
          },
        ],
      })
    );
  });

  it("Find Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, null);

    expect(JSON.stringify(response)).toBe(
      JSON.stringify({
        items: [
          {
            id: 2,
            productId: 3,
            productName: "mandolin",
            quantity: 4,
            userId: 2,
            status: "ACTIVE",
          },
          {
            id: 3,
            productId: 3,
            productName: "mandolin",
            quantity: 2,
            userId: 2,
            status: "ACTIVE",
          },
          {
            id: 4,
            productId: 4,
            productName: "bake rolls",
            quantity: 1,
            userId: 2,
            status: "COMPLETE",
          },
        ],
      })
    );
  });

  it("Find Complete Orders for user with id 2", async () => {
    const response = await findOrdersByUserId(2, "COMPLETE");

    expect(JSON.stringify(response)).toBe(
      JSON.stringify({
        items: [
          {
            id: 4,
            productId: 4,
            productName: "bake rolls",
            quantity: 1,
            userId: 2,
            status: "COMPLETE",
          },
        ],
      })
    );
  });
});
