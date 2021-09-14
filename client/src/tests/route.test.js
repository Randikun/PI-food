/* eslint-disable no-unused-expressions */

var supertest = require("supertest-as-promised")(require("../app"));
var model = require("../models/model");

describe("Routes", function () {
  beforeEach(function () {
    model.reset();
  });

  describe("/recipe", function () {
    it("POST agrega una nueva receta y devuelve un mensaje de exito", function () {
      return supertest
        .post("/recipe")
        .send({ title: "arroz", summary: "esta buenisimo" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).toEqual("You created a new recipe!");
        });
    });
  });
});
