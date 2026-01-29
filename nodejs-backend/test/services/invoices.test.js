const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("invoices service", () => {
  let thisService;
  let invoiceCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("invoices");

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
    assert.ok(thisService, "Registered the service (invoices)");
  });

  describe("#create", () => {
    const options = {"customerId":23,"vehicleId":23,"serviceDate":23,"totalAmount":23,"paymentStatus":"new value","paymentMethod":"new value","notes":"new value"};

    beforeEach(async () => {
      invoiceCreated = await thisService.create({...options, ...users});
    });

    it("should create a new invoice", () => {
      assert.strictEqual(invoiceCreated.customerId, options.customerId);
assert.strictEqual(invoiceCreated.vehicleId, options.vehicleId);
assert.strictEqual(invoiceCreated.serviceDate, options.serviceDate);
assert.strictEqual(invoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(invoiceCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(invoiceCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoice by ID", async () => {
      const retrieved = await thisService.findById(invoiceCreated._id);
      assert.strictEqual(retrieved._id.toString(), invoiceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerId":100,"vehicleId":100,"serviceDate":100,"totalAmount":100,"paymentStatus":"updated value","paymentMethod":"updated value","notes":"updated value"};

    it("should update an existing invoice ", async () => {
      const invoiceUpdated = await thisService.findByIdAndUpdate(
        invoiceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(invoiceUpdated.customerId, options.customerId);
assert.strictEqual(invoiceUpdated.vehicleId, options.vehicleId);
assert.strictEqual(invoiceUpdated.serviceDate, options.serviceDate);
assert.strictEqual(invoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(invoiceUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(invoiceUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
    it("should delete a invoice", async () => {
      const invoiceDeleted = await thisService.remove(invoiceCreated._id);
      assert.strictEqual(invoiceDeleted._id.toString(), invoiceCreated._id.toString());
    });
  });
});