const { Router } = require('express');
// Importar todos los routers;
const RouteRecipes = require('./Recipes.js');
const RouteRecipe = require('./Recipe.js');
const RouteTypes = require('./Types.js');

const router = Router();

router.use('/recipes', RouteRecipes)
router.use('/recipe', RouteRecipe)
router.use('/types', RouteTypes)




module.exports = router;
