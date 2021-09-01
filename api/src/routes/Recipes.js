const express = require('express')
const router = express.Router()


 const {getAllRecipes, addRecipe, getRecipeById} = require("../controllers/Recipes")


 router.get("/", getAllRecipes)
 router.get('/:id', getRecipeById)
 router.post("/", addRecipe)

module.exports = router