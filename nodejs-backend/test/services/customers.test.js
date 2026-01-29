const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customers service", () => {
  let thisService;
  let customerCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("customers");

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
    assert.ok(thisService, "Registered the service (customers)");
  });

  describe("#create", () => {
    const options = {"firstName":"new value","lastName":"new value","email":"new value","phoneNumber":"new value","address":"new value","joinDate":23,"loyaltyPoints":23};

    beforeEach(async () => {
      customerCreated = await thisService.create({...options, ...users});
    });

    it("should create a new customer", () => {
      assert.strictEqual(customerCreated.firstName, options.firstName);
assert.strictEqual(customerCreated.lastName, options.lastName);
assert.strictEqual(customerCreated.email, options.email);
assert.strictEqual(customerCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerCreated.address, options.address);
assert.strictEqual(customerCreated.joinDate, options.joinDate);
assert.strictEqual(customerCreated.loyaltyPoints, options.loyaltyPoints);
    });
  });

  describe("#get", () => {
    it("should retrieve a customer by ID", async () => {
      const retrieved = await thisService.findById(customerCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"firstName":"updated value","lastName":"updated value","email":"updated value","phoneNumber":"updated value","address":"updated value","joinDate":100,"loyaltyPoints":100};

    it("should update an existing customer ", async () => {
      const customerUpdated = await thisService.findByIdAndUpdate(
        customerCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerUpdated.firstName, options.firstName);
assert.strictEqual(customerUpdated.lastName, options.lastName);
assert.strictEqual(customerUpdated.email, options.email);
assert.strictEqual(customerUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerUpdated.address, options.address);
assert.strictEqual(customerUpdated.joinDate, options.joinDate);
assert.strictEqual(customerUpdated.loyaltyPoints, options.loyaltyPoints);
    });
  });

  describe("#delete", () => {
    it("should delete a customer", async () => {
      const customerDeleted = await thisService.remove(customerCreated._id);
      assert.strictEqual(customerDeleted._id.toString(), customerCreated._id.toString());
    });
  });
});