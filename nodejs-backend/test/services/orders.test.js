const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orders service", () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("orders");

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
    assert.ok(thisService, "Registered the service (orders)");
  });

  describe("#create", () => {
    const options = {"name":"new value","products":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      orderCreated = await thisService.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.name, options.name);
assert.strictEqual(orderCreated.products, options.products);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","products":"345345345345345345345"};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.name, options.name);
assert.strictEqual(orderUpdated.products, options.products);
    });
  });

  describe("#delete", () => {
    it("should delete a order", async () => {
      const orderDeleted = await thisService.remove(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});