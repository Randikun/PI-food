require("dotenv").config();
const { API_KEY } = process.env;

const { Recipe, Diet } = require("../db");

const axios = require("axios");
const { Op } = require("sequelize");

async function APIcall() {
  try {
    const recipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const requiredInfo = recipeApi.data.results.map((recipe) => {
      return {
        title: recipe.title,
        created: false,
        Diets: recipe.diets.map((diet) => {
          return { name: diet };
        }),
        healthiness: recipe.healthScore,
        summary: recipe.summary,
        image: recipe.image,
        id: recipe.id,
        score: parseInt(recipe.spoonacularScore),
        steps: recipe.analyzedInstructions
          .map((r) => r.steps.map((s) => s.step))
          .flat(2)
          .join(""),
      };
    });
    return requiredInfo;
  } catch {
    console.log('HAY ERROR EN APICALL');

    (e) => console.log(e);
  }
}

async function getAllRecipes(req, res, next) {
  const { name } = req.query;
  if (!name) {
    try {
      const requiredInfo = await APIcall();
      const recipeBD = await Recipe.findAll({
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });
      return res.send([...recipeBD, ...requiredInfo]);
    } catch (err) {
      console.log('AK HAY ERROR');

      next(err);
    }
  } else {
    const query = name.toLowerCase();
    try {
      const requiredInfo = await APIcall();

      const filteredRecipeApi = requiredInfo.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );

      const filteredrecipeBD = await Recipe.findAll({
        where: {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });

      return res.send([...filteredrecipeBD, ...filteredRecipeApi]);
    } catch {
      console.log('AK HAY ERROR');

      (err) => next(err);
    }
  }
}

const APIcallID = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const requiredInfo = {
      title: response.data.title,
      created: false,
      Diets: response.data.diets.map((diet) => {
        return { name: diet };
      }),
      healthiness: response.data.healthScore,
      summary: response.data.summary.replace(/<[^>]*>?/g, ""),
      image: response.data.image,
      id: response.data.id,
      score: parseInt(response.data.spoonacularScore),
      steps: response.data.analyzedInstructions
        .map((r) => r.steps.map((s) => s.step))
        .flat(2)
        .join(""),
    };
    return requiredInfo;
  } catch {
    (e) => console.log(e);
  }
};

async function getRecipeById(req, res) {
  try {
    const requiredInfo = await APIcallID(req.params.id);
    if (requiredInfo) res.json(requiredInfo);
    else {
      try {
        const recipe = await Recipe.findByPk(req.params.id, {
          include: {
            model: Diet,
            through: {
              attributes: [],
            },
          },
        });
        if (recipe) return res.json(recipe);
        return res
          .status(404)
          .json({ error: "Sorry! we could not find that recipe!" });
      } catch {
        (e) => console.log(e);
      }
    }
  } catch {
    (err) => next(err);
  }
}

module.exports = {
  getRecipeById,
  getAllRecipes,
};
