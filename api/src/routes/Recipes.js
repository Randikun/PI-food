const express = require('express')
const router = express.Router()


 const {getAllRecipes, getRecipeById} = require("../controllers/Recipes")


 router.get("/", getAllRecipes)
 router.get('/:id', getRecipeById)


module.exports = router