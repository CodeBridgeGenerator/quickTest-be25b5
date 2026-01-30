const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("maintenanceSchedules service", () => {
  let thisService;
  let maintenanceScheduleCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("maintenanceSchedules");

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
    assert.ok(thisService, "Registered the service (maintenanceSchedules)");
  });

  describe("#create", () => {
    const options = {"vehicleId":23,"serviceId":23,"nextServiceDate":23,"notes":"new value"};

    beforeEach(async () => {
      maintenanceScheduleCreated = await thisService.create({...options, ...users});
    });

    it("should create a new maintenanceSchedule", () => {
      assert.strictEqual(maintenanceScheduleCreated.vehicleId, options.vehicleId);
assert.strictEqual(maintenanceScheduleCreated.serviceId, options.serviceId);
assert.strictEqual(maintenanceScheduleCreated.nextServiceDate, options.nextServiceDate);
assert.strictEqual(maintenanceScheduleCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a maintenanceSchedule by ID", async () => {
      const retrieved = await thisService.findById(maintenanceScheduleCreated._id);
      assert.strictEqual(retrieved._id.toString(), maintenanceScheduleCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"vehicleId":100,"serviceId":100,"nextServiceDate":100,"notes":"updated value"};

    it("should update an existing maintenanceSchedule ", async () => {
      const maintenanceScheduleUpdated = await thisService.findByIdAndUpdate(
        maintenanceScheduleCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(maintenanceScheduleUpdated.vehicleId, options.vehicleId);
assert.strictEqual(maintenanceScheduleUpdated.serviceId, options.serviceId);
assert.strictEqual(maintenanceScheduleUpdated.nextServiceDate, options.nextServiceDate);
assert.strictEqual(maintenanceScheduleUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
    it("should delete a maintenanceSchedule", async () => {
      const maintenanceScheduleDeleted = await thisService.remove(maintenanceScheduleCreated._id);
      assert.strictEqual(maintenanceScheduleDeleted._id.toString(), maintenanceScheduleCreated._id.toString());
    });
  });
});