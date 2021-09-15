const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require("uuid");

async function addRecipe(req, res, next) {
  const { title, summary, score, healthiness, image, steps, diets } = req.body;
  if (!title || !summary) {
    return res.status(400).send("you need at least a title and a summary ");
  }
  try {
    const newRecipe = await Recipe.create({
      id: uuidv4(),
      created: true,
      title,
      summary,
      score: score || 0,
      healthiness: healthiness || 0,
      steps:
        steps || "Sadly we don`t know how to prepare this recipe step by step",
      image: image
        ? image
        : "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png",
    });
    console.log("newrecipe", newRecipe);

    if (diets.length) {
      diets.map(async (diet) => {
        try {
          let dietdb = await Diet.findOne({ where: { name: diet } });
          newRecipe.addDiet(dietdb);
          console.log("dietdb", dietdb);
        } catch {
          console.log('AK HAY ERROR');
          (err) => next(err);
        }
      });
    }
    res.json({ message: "You created a new recipe!" });
  } catch {
    (err) => {
      console.log('OOO AK');
      next(err);
    };
  }
}


module.exports = {
  addRecipe,
  
};
