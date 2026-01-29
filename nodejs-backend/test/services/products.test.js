const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("products service", () => {
  let thisService;
  let productCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("products");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (products)");
  });

  describe("#create", () => {
    const options = {"name":"new value","sku":"new value","price":23};

    beforeEach(async () => {
      productCreated = await thisService.create({...options, ...users});
    });

    it("should create a new product", () => {
      assert.strictEqual(productCreated.name, options.name);
assert.strictEqual(productCreated.sku, options.sku);
assert.strictEqual(productCreated.price, options.price);
    });
  });

  describe("#get", () => {
    it("should retrieve a product by ID", async () => {
      const retrieved = await thisService.findById(productCreated._id);
      assert.strictEqual(retrieved._id.toString(), productCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","sku":"updated value","price":100};

    it("should update an existing product ", async () => {
      const productUpdated = await thisService.findByIdAndUpdate(
        productCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productUpdated.name, options.name);
assert.strictEqual(productUpdated.sku, options.sku);
assert.strictEqual(productUpdated.price, options.price);
    });
  });

  describe("#delete", () => {
    it("should delete a product", async () => {
      const productDeleted = await thisService.remove(productCreated._id);
      assert.strictEqual(productDeleted._id.toString(), productCreated._id.toString());
    });
  });
});