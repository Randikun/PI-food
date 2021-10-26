const express = require('express')
const router = express.Router()


 const {getAllRecipes, getRecipeById, deleteRecipe} = require("../controllers/Recipes")


 router.get("/", getAllRecipes)
 router.get('/:id', getRecipeById)
 router.delete('/:id', deleteRecipe)


module.exports = router