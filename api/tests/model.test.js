const { Recipe, Diet } = require("../../src/db.js");

describe("Recipe model", () => {
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({ name: "arroz con pollo", summary: "something" });
      });
    });
  });
});

describe("Validate type", () => {
  beforeEach(() => Diet.sync({ force: true }));
  describe("title", () => {
    it("should throw an error if name is null", (done) => {
      Recipe.create({})
        .then(() => done(new Error("It requires a valid name")))
        .catch(() => done());
    });
    it("should work when its a valid title", () => {
      Diet.create({ name: "Gluten Free" });
    });
  });
});
