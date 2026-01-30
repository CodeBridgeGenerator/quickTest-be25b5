const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("technicians service", () => {
  let thisService;
  let technicianCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("technicians");

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
    assert.ok(thisService, "Registered the service (technicians)");
  });

  describe("#create", () => {
    const options = {"firstName":"new value","lastName":"new value","email":"new value","phoneNumber":"new value","specialization":"new value"};

    beforeEach(async () => {
      technicianCreated = await thisService.create({...options, ...users});
    });

    it("should create a new technician", () => {
      assert.strictEqual(technicianCreated.firstName, options.firstName);
assert.strictEqual(technicianCreated.lastName, options.lastName);
assert.strictEqual(technicianCreated.email, options.email);
assert.strictEqual(technicianCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(technicianCreated.specialization, options.specialization);
    });
  });

  describe("#get", () => {
    it("should retrieve a technician by ID", async () => {
      const retrieved = await thisService.findById(technicianCreated._id);
      assert.strictEqual(retrieved._id.toString(), technicianCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"firstName":"updated value","lastName":"updated value","email":"updated value","phoneNumber":"updated value","specialization":"updated value"};

    it("should update an existing technician ", async () => {
      const technicianUpdated = await thisService.findByIdAndUpdate(
        technicianCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(technicianUpdated.firstName, options.firstName);
assert.strictEqual(technicianUpdated.lastName, options.lastName);
assert.strictEqual(technicianUpdated.email, options.email);
assert.strictEqual(technicianUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(technicianUpdated.specialization, options.specialization);
    });
  });

  describe("#delete", () => {
    it("should delete a technician", async () => {
      const technicianDeleted = await thisService.remove(technicianCreated._id);
      assert.strictEqual(technicianDeleted._id.toString(), technicianCreated._id.toString());
    });
  });
});