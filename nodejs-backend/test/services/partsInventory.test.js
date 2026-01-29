const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("partsInventory service", () => {
  let thisService;
  let partsInventoryCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("partsInventory");

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
    assert.ok(thisService, "Registered the service (partsInventory)");
  });

  describe("#create", () => {
    const options = {"partName":"new value","description":"new value","quantityInStock":23,"price":23,"supplierId":23};

    beforeEach(async () => {
      partsInventoryCreated = await thisService.create({...options, ...users});
    });

    it("should create a new partsInventory", () => {
      assert.strictEqual(partsInventoryCreated.partName, options.partName);
assert.strictEqual(partsInventoryCreated.description, options.description);
assert.strictEqual(partsInventoryCreated.quantityInStock, options.quantityInStock);
assert.strictEqual(partsInventoryCreated.price, options.price);
assert.strictEqual(partsInventoryCreated.supplierId, options.supplierId);
    });
  });

  describe("#get", () => {
    it("should retrieve a partsInventory by ID", async () => {
      const retrieved = await thisService.findById(partsInventoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), partsInventoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partName":"updated value","description":"updated value","quantityInStock":100,"price":100,"supplierId":100};

    it("should update an existing partsInventory ", async () => {
      const partsInventoryUpdated = await thisService.findByIdAndUpdate(
        partsInventoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(partsInventoryUpdated.partName, options.partName);
assert.strictEqual(partsInventoryUpdated.description, options.description);
assert.strictEqual(partsInventoryUpdated.quantityInStock, options.quantityInStock);
assert.strictEqual(partsInventoryUpdated.price, options.price);
assert.strictEqual(partsInventoryUpdated.supplierId, options.supplierId);
    });
  });

  describe("#delete", () => {
    it("should delete a partsInventory", async () => {
      const partsInventoryDeleted = await thisService.remove(partsInventoryCreated._id);
      assert.strictEqual(partsInventoryDeleted._id.toString(), partsInventoryCreated._id.toString());
    });
  });
});