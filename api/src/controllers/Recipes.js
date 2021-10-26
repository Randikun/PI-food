require("dotenv").config();
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");


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
        summary: recipe.summary.replace(/<[^>]*>?/g, ""),
        image: recipe.image,
        id: uuidv4(),
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
    const AllrecipesBD = await Recipe.findAll({
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });
    if (AllrecipesBD.length > 0) return res.send(AllrecipesBD);
    else {
      try {
        const requiredInfo = await APIcall();
        const recipesBulk = await Recipe.bulkCreate(requiredInfo)
        recipesBulk.map(recipe => {
          requiredInfo.map(r =>{

            if (r.Diets.length && r.id === recipe.id) {
              r.Diets.map(async (diet) => {
                
                try {
                  diet.name = diet.name.charAt(0).toUpperCase() + diet.name.slice(1)
                  let dietdb = await Diet.findOne({ where: { name: diet.name } });
                  await  recipe.addDiet(dietdb);
                } catch {
                  console.log(' HAY ERROR al asociarle la dieta');
                  (err) => next(err);
                }
              });
            }
          })
        })

        const AllrecipesBD = await Recipe.findAll({
          include: {
            model: Diet,
            through:  {
              attributes: []
            },
          },
        });
        return res.send(AllrecipesBD);


      } catch (err) {
        console.log(' HAY ERROR para crear y obtenmer recetas');

        next(err);
      }
    }

  } else {
    const query = name.toLowerCase();
    try {

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

      return res.send(filteredrecipeBD);
    } catch {
      console.log('AK HAY ERROR');

      (err) => next(err);
    }
  }
}


async function getRecipeById(req, res) {
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
    (err) => next(err);
  }
}
async function deleteRecipe(req, res, next) {
  let id = req.params.id

  try {
    await Recipe.destroy({
      where: {
        id: id
      }
    })
    return res.send('deleted')
  } catch (error) {
    next(error)
  }

}

module.exports = {
  getRecipeById,
  getAllRecipes,
  deleteRecipe
};
