


const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require("uuid");



async function addRecipe(req, res, next) {
    
    const { title, summary, score, healthiness, image, steps, diets } = req.body;
    if (!title || !summary){
      return res.status(400).send('you need at least a title and a summary ')      
      };
    try {
      const newRecipe = await Recipe.create({
        id:  uuidv4(),
        created: true,
        title,
        summary,
        score,
        healthiness,
        steps,
        image: image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png",
      });
     
      if(diets.length){
       diets.map(async(diet)=>{
        try{
          let dietdb = await Diet.findOne({where:{name:diet}})
          newRecipe.addDiet(dietdb)
        }catch{err=>next(err)}
      })}
      res.json({message: "You created a new recipe!"});
    } catch {(err) => { 
        next(err);}}
  }

  

module.exports = {
  
    addRecipe,
  };