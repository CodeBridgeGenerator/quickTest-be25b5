const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("serviceRecords service", () => {
  let thisService;
  let serviceRecordCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("serviceRecords");

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
    assert.ok(thisService, "Registered the service (serviceRecords)");
  });

  describe("#create", () => {
    const options = {"invoiceId":23,"serviceId":23,"vehicleId":23,"technicianId":23,"serviceDate":23};

    beforeEach(async () => {
      serviceRecordCreated = await thisService.create({...options, ...users});
    });

    it("should create a new serviceRecord", () => {
      assert.strictEqual(serviceRecordCreated.invoiceId, options.invoiceId);
assert.strictEqual(serviceRecordCreated.serviceId, options.serviceId);
assert.strictEqual(serviceRecordCreated.vehicleId, options.vehicleId);
assert.strictEqual(serviceRecordCreated.technicianId, options.technicianId);
assert.strictEqual(serviceRecordCreated.serviceDate, options.serviceDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a serviceRecord by ID", async () => {
      const retrieved = await thisService.findById(serviceRecordCreated._id);
      assert.strictEqual(retrieved._id.toString(), serviceRecordCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"invoiceId":100,"serviceId":100,"vehicleId":100,"technicianId":100,"serviceDate":100};

    it("should update an existing serviceRecord ", async () => {
      const serviceRecordUpdated = await thisService.findByIdAndUpdate(
        serviceRecordCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(serviceRecordUpdated.invoiceId, options.invoiceId);
assert.strictEqual(serviceRecordUpdated.serviceId, options.serviceId);
assert.strictEqual(serviceRecordUpdated.vehicleId, options.vehicleId);
assert.strictEqual(serviceRecordUpdated.technicianId, options.technicianId);
assert.strictEqual(serviceRecordUpdated.serviceDate, options.serviceDate);
    });
  });

  describe("#delete", () => {
    it("should delete a serviceRecord", async () => {
      const serviceRecordDeleted = await thisService.remove(serviceRecordCreated._id);
      assert.strictEqual(serviceRecordDeleted._id.toString(), serviceRecordCreated._id.toString());
    });
  });
});