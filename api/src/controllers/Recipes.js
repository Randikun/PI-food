require("dotenv").config();
const { API_KEY } = process.env;

const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { Op } = require("sequelize");


async function APIcall(){
    try{  
    const recipeApi = await axios.get(
     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      );
      const requiredInfo = recipeApi.data.results.map((recipe) => {
        return {
          title: recipe.title,
          diets: recipe.diets.map((diet) => {
            return { name: diet };
          }),
          healthyness: recipe.healthScore,
          summary: recipe.summary,
          image: recipe.image,
          id: recipe.id,
          score: parseInt(recipe.spoonacularScore),
          steps: recipe.analyzedInstructions
            .map((r) => r.steps.map((s) => s.step))
            .flat(2)
            .join(""),
        };
       }
    )
    return requiredInfo
    }
    catch{e=>console.log(e)}
}

async function getAllRecipes(req, res, next) {
  const { name } = req.query;
  if (!name) {
    try {
      const requiredInfo = await APIcall()
      const recipeBD = await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const response = await Promise.all([recipeBD, requiredInfo]);
      return res.send(response);
    } catch (err) {
      next(err);
    }
  } else {
    const query = name.toLowerCase();
    try {
      const requiredInfo = await APIcall()

      const filteredRecipeApi = requiredInfo.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );

      const recipeBD = await Recipe.findAll({
        where: {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const response = await Promise.all([recipeBD, filteredRecipeApi]);

      return res.send(response);

    } catch {
      (err) => next(err);
    }
  }
}

async function addRecipe(req, res, next) {
    
  const { title, summary, score, healthiness, image, steps, diets } = req.body;
  if (!title || !summary){
    return res.status(400).send('you need at least a title and a summary ')      
    };
  try {
    const newRecipe = await Recipe.create({
      id:  uuidv4(),
      title,
      summary,
      score,
      healthiness,
      steps,
      image: image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png",
    });
    console.log('ESTO ME MANDAN', diets)
    const dietsId = diets.map(async(diet) =>{ 
     try{
       console.log('VOY A BUSCAR EL ID EN BD  QUE CORRESPONDE A ', diet)
       let dietBD = await Diet.findAll({
       where:{name:diet},
       attributes:['id']
       })
       console.log('lo que me llega es lo siguiente',dietBD)
       console.log('EL ID DEBERIA SER', dietBD[0].dataValues.id)
       const id = dietBD[0].dataValues.id
       return id;
      }catch{err=>
        console.log('error encontrando el id', err)
        next(err)}
     });

 
     console.log('ahora viene el for each de DIETSID', ids)

     ids.forEach(async (id) => {  console.log('id',id)
                                await newRecipe.addDiet(id)
                  });
    
    res.json({message: "You created a new recipe!"});

  } catch {(err) => { 
      next(err);}}
}

const APIcallID = async (id) => {
  console.log('entrooo')
   try{
       console.log('id', id)
        const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      
      console.log("RESPONSE",response.data)
      const requiredInfo = {
            title: response.data.title,
            diets: response.data.diets.map((diet) => {
              return { name: diet };
            }),
            healthiness: response.data.healthScore,
            summary: response.data.summary,
            image: response.data.image,
            id: response.data.id,
            score: parseInt(response.data.spoonacularScore),
            steps: response.data.analyzedInstructions
              .map((r) => r.steps.map((s) => s.step))
              .flat(2)
              .join(""),
          };
          return requiredInfo;
       }
    catch{e=>console.log(e)}
}


async function getRecipeById(req, res) {

  try {
    
    const requiredInfo = await APIcallID( req.params.id)
    
    res.json(requiredInfo);
  } 
   
  catch (error) {
    if (error.response?.status === 404) {
            try{
                const recipe = await Recipe.findByPk(req.params.id, {
                    include: {
                     model: Diet,
                     attributes: ["name"],
                    through: {
                     attributes: [],
                    },
                    },
                    })
                    if (recipe) return res.json(recipe);
                    return res.sendStatus(404);
             }catch{e=>console.log(e)}
             
    } 
    
    else {
      res.status(500).json({ error: "Sorry! we could not find that recipe!" });
    }
  }
}

module.exports = {
  addRecipe,
  getRecipeById,
  getAllRecipes,
};
