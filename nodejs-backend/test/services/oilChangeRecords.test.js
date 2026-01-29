const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("oilChangeRecords service", () => {
  let thisService;
  let oilChangeRecordCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("oilChangeRecords");

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
    assert.ok(thisService, "Registered the service (oilChangeRecords)");
  });

  describe("#create", () => {
    const options = {"vehicleId":23,"serviceRecordId":23,"oilType":"new value","mileage":23,"technicianId":23,"dateOfChange":23};

    beforeEach(async () => {
      oilChangeRecordCreated = await thisService.create({...options, ...users});
    });

    it("should create a new oilChangeRecord", () => {
      assert.strictEqual(oilChangeRecordCreated.vehicleId, options.vehicleId);
assert.strictEqual(oilChangeRecordCreated.serviceRecordId, options.serviceRecordId);
assert.strictEqual(oilChangeRecordCreated.oilType, options.oilType);
assert.strictEqual(oilChangeRecordCreated.mileage, options.mileage);
assert.strictEqual(oilChangeRecordCreated.technicianId, options.technicianId);
assert.strictEqual(oilChangeRecordCreated.dateOfChange, options.dateOfChange);
    });
  });

  describe("#get", () => {
    it("should retrieve a oilChangeRecord by ID", async () => {
      const retrieved = await thisService.findById(oilChangeRecordCreated._id);
      assert.strictEqual(retrieved._id.toString(), oilChangeRecordCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"vehicleId":100,"serviceRecordId":100,"oilType":"updated value","mileage":100,"technicianId":100,"dateOfChange":100};

    it("should update an existing oilChangeRecord ", async () => {
      const oilChangeRecordUpdated = await thisService.findByIdAndUpdate(
        oilChangeRecordCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(oilChangeRecordUpdated.vehicleId, options.vehicleId);
assert.strictEqual(oilChangeRecordUpdated.serviceRecordId, options.serviceRecordId);
assert.strictEqual(oilChangeRecordUpdated.oilType, options.oilType);
assert.strictEqual(oilChangeRecordUpdated.mileage, options.mileage);
assert.strictEqual(oilChangeRecordUpdated.technicianId, options.technicianId);
assert.strictEqual(oilChangeRecordUpdated.dateOfChange, options.dateOfChange);
    });
  });

  describe("#delete", () => {
    it("should delete a oilChangeRecord", async () => {
      const oilChangeRecordDeleted = await thisService.remove(oilChangeRecordCreated._id);
      assert.strictEqual(oilChangeRecordDeleted._id.toString(), oilChangeRecordCreated._id.toString());
    });
  });
});