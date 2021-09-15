// const { expect } = require("chai");
// const session = require("supertest-session");
// const app = require("../../client/src/app.js");
// const { Recipe } = require("../../src/db.js");
// /* eslint-disable no-unused-expressions */

//   describe("/recipe", function () {
//     it("POST agrega una nueva receta y devuelve un mensaje de exito", function () {
//       return supertest
//         .post("/recipe")
//         .send({ title: "arroz", summary: "esta buenisimo" })
//         .expect(200)
//         .expect("Content-Type", /json/)
//         .expect(function (res) {
//           expect(res.body).toEqual("You created a new recipe!");
//         });
//     });
//   });
// });

// const agent = session(app);
// const recipe = {
//   title: "Arroz con pollo",
//   summary: "algo",
// };

// describe("Rutas Recipes", () => {
//   beforeEach(() =>
//     Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
//   );
//   describe("GET /Recipes", () => {
//     it("should get 200", () => agent.get("/recipes").expect(200));
//   });
// });

// describe("Rutas Types", () => {
//   describe("GET /types", () => {
//     it("should get 200", () => agent.get("/types").expect(200));
//   });
// });
