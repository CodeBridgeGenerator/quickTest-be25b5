const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("paymentMethods service", () => {
  let thisService;
  let paymentMethodCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("paymentMethods");

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
    assert.ok(thisService, "Registered the service (paymentMethods)");
  });

  describe("#create", () => {
    const options = {"methodName":"new value","description":"new value"};

    beforeEach(async () => {
      paymentMethodCreated = await thisService.create({...options, ...users});
    });

    it("should create a new paymentMethod", () => {
      assert.strictEqual(paymentMethodCreated.methodName, options.methodName);
assert.strictEqual(paymentMethodCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a paymentMethod by ID", async () => {
      const retrieved = await thisService.findById(paymentMethodCreated._id);
      assert.strictEqual(retrieved._id.toString(), paymentMethodCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"methodName":"updated value","description":"updated value"};

    it("should update an existing paymentMethod ", async () => {
      const paymentMethodUpdated = await thisService.findByIdAndUpdate(
        paymentMethodCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(paymentMethodUpdated.methodName, options.methodName);
assert.strictEqual(paymentMethodUpdated.description, options.description);
    });
  });

  describe("#delete", () => {
    it("should delete a paymentMethod", async () => {
      const paymentMethodDeleted = await thisService.remove(paymentMethodCreated._id);
      assert.strictEqual(paymentMethodDeleted._id.toString(), paymentMethodCreated._id.toString());
    });
  });
});