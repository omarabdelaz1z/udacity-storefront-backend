import { addProduct, findProductById, findProducts } from "../models/Product";

describe("Product Model Suite", () => {
  it("create a product", async () => {
    const response = await addProduct({
      name: "kataketo",
      price: 4,
      category: "chocolate",
    });

    expect(response.data).toBeTruthy();
  });

  it("get products", async () => {
    const response = await findProducts();

    expect(response.items).toHaveSize(6);
    expect(response.items[0].name).toEqual("koolaid");
    expect(response.items[0].price).toContain("$50.00");
    expect(response.items[0].category).toContain("Drink Mix");
  });

  it("get product of id 1", async () => {
    const {
      data: { id, name, price, category },
    } = await findProductById(1);

    expect(id).toEqual(1);
    expect(name).toEqual("koolaid");
    expect(price).toContain("$50.00");
    expect(category).toContain("Drink Mix");
  });
});
