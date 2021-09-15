/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  title: "Arroz con pollo",
  summary: "algo",
  id:'266f2ba5-9880-46fd-ad91-1a27169562a1'
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );

});


describe("POST /recipe",  () =>{
  it("POST agrega una nueva receta y devuelve un mensaje de exito",  () =>{agent.post("/recipe")
      .send({ title: "arroz", summary: "esta buenisimo" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(res => {
        expect(res.body).toEqual("You created a new recipe!");
      });
  });
});
