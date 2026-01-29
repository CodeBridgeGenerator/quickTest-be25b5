const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("vehicles service", () => {
  let thisService;
  let vehicleCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("vehicles");

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
    assert.ok(thisService, "Registered the service (vehicles)");
  });

  describe("#create", () => {
    const options = {"customerId":23,"make":"new value","model":"new value","year":23,"licensePlate":"new value","vin":"new value"};

    beforeEach(async () => {
      vehicleCreated = await thisService.create({...options, ...users});
    });

    it("should create a new vehicle", () => {
      assert.strictEqual(vehicleCreated.customerId, options.customerId);
assert.strictEqual(vehicleCreated.make, options.make);
assert.strictEqual(vehicleCreated.model, options.model);
assert.strictEqual(vehicleCreated.year, options.year);
assert.strictEqual(vehicleCreated.licensePlate, options.licensePlate);
assert.strictEqual(vehicleCreated.vin, options.vin);
    });
  });

  describe("#get", () => {
    it("should retrieve a vehicle by ID", async () => {
      const retrieved = await thisService.findById(vehicleCreated._id);
      assert.strictEqual(retrieved._id.toString(), vehicleCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerId":100,"make":"updated value","model":"updated value","year":100,"licensePlate":"updated value","vin":"updated value"};

    it("should update an existing vehicle ", async () => {
      const vehicleUpdated = await thisService.findByIdAndUpdate(
        vehicleCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(vehicleUpdated.customerId, options.customerId);
assert.strictEqual(vehicleUpdated.make, options.make);
assert.strictEqual(vehicleUpdated.model, options.model);
assert.strictEqual(vehicleUpdated.year, options.year);
assert.strictEqual(vehicleUpdated.licensePlate, options.licensePlate);
assert.strictEqual(vehicleUpdated.vin, options.vin);
    });
  });

  describe("#delete", () => {
    it("should delete a vehicle", async () => {
      const vehicleDeleted = await thisService.remove(vehicleCreated._id);
      assert.strictEqual(vehicleDeleted._id.toString(), vehicleCreated._id.toString());
    });
  });
});