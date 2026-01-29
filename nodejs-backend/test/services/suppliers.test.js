const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("suppliers service", () => {
  let thisService;
  let supplierCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("suppliers");

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
    assert.ok(thisService, "Registered the service (suppliers)");
  });

  describe("#create", () => {
    const options = {"supplierName":"new value","contactPerson":"new value","phoneNumber":"new value","email":"new value","address":"new value"};

    beforeEach(async () => {
      supplierCreated = await thisService.create({...options, ...users});
    });

    it("should create a new supplier", () => {
      assert.strictEqual(supplierCreated.supplierName, options.supplierName);
assert.strictEqual(supplierCreated.contactPerson, options.contactPerson);
assert.strictEqual(supplierCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(supplierCreated.email, options.email);
assert.strictEqual(supplierCreated.address, options.address);
    });
  });

  describe("#get", () => {
    it("should retrieve a supplier by ID", async () => {
      const retrieved = await thisService.findById(supplierCreated._id);
      assert.strictEqual(retrieved._id.toString(), supplierCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"supplierName":"updated value","contactPerson":"updated value","phoneNumber":"updated value","email":"updated value","address":"updated value"};

    it("should update an existing supplier ", async () => {
      const supplierUpdated = await thisService.findByIdAndUpdate(
        supplierCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(supplierUpdated.supplierName, options.supplierName);
assert.strictEqual(supplierUpdated.contactPerson, options.contactPerson);
assert.strictEqual(supplierUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(supplierUpdated.email, options.email);
assert.strictEqual(supplierUpdated.address, options.address);
    });
  });

  describe("#delete", () => {
    it("should delete a supplier", async () => {
      const supplierDeleted = await thisService.remove(supplierCreated._id);
      assert.strictEqual(supplierDeleted._id.toString(), supplierCreated._id.toString());
    });
  });
});