const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("loyaltyPrograms service", () => {
  let thisService;
  let loyaltyProgramCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("loyaltyPrograms");

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
    assert.ok(thisService, "Registered the service (loyaltyPrograms)");
  });

  describe("#create", () => {
    const options = {"partId":23,"partName":"new value","description":"new value","quantityInStock":23,"price":23,"supplierId":23};

    beforeEach(async () => {
      loyaltyProgramCreated = await thisService.create({...options, ...users});
    });

    it("should create a new loyaltyProgram", () => {
      assert.strictEqual(loyaltyProgramCreated.partId, options.partId);
assert.strictEqual(loyaltyProgramCreated.partName, options.partName);
assert.strictEqual(loyaltyProgramCreated.description, options.description);
assert.strictEqual(loyaltyProgramCreated.quantityInStock, options.quantityInStock);
assert.strictEqual(loyaltyProgramCreated.price, options.price);
assert.strictEqual(loyaltyProgramCreated.supplierId, options.supplierId);
    });
  });

  describe("#get", () => {
    it("should retrieve a loyaltyProgram by ID", async () => {
      const retrieved = await thisService.findById(loyaltyProgramCreated._id);
      assert.strictEqual(retrieved._id.toString(), loyaltyProgramCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partId":100,"partName":"updated value","description":"updated value","quantityInStock":100,"price":100,"supplierId":100};

    it("should update an existing loyaltyProgram ", async () => {
      const loyaltyProgramUpdated = await thisService.findByIdAndUpdate(
        loyaltyProgramCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(loyaltyProgramUpdated.partId, options.partId);
assert.strictEqual(loyaltyProgramUpdated.partName, options.partName);
assert.strictEqual(loyaltyProgramUpdated.description, options.description);
assert.strictEqual(loyaltyProgramUpdated.quantityInStock, options.quantityInStock);
assert.strictEqual(loyaltyProgramUpdated.price, options.price);
assert.strictEqual(loyaltyProgramUpdated.supplierId, options.supplierId);
    });
  });

  describe("#delete", () => {
    it("should delete a loyaltyProgram", async () => {
      const loyaltyProgramDeleted = await thisService.remove(loyaltyProgramCreated._id);
      assert.strictEqual(loyaltyProgramDeleted._id.toString(), loyaltyProgramCreated._id.toString());
    });
  });
});