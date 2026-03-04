const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("tablea service", async () => {
  let thisService;
  let tableaCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("tablea");

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
    assert.ok(thisService, "Registered the service (tablea)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      tableaCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new tablea", () => {
      assert.strictEqual(tableaCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a tablea by ID", async () => {
      const retrieved = await thisService.Model.findById(tableaCreated._id);
      assert.strictEqual(retrieved._id.toString(), tableaCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing tablea ", async () => {
      const tableaUpdated = await thisService.Model.findByIdAndUpdate(
        tableaCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(tableaUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a tablea", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const tableaDeleted = await thisService.Model.findByIdAndDelete(tableaCreated._id);
      assert.strictEqual(tableaDeleted._id.toString(), tableaCreated._id.toString());
    });
  });
});