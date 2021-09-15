const express = require('express')
const router = express.Router()


 const { addRecipe, deleteRecipe } = require("../controllers/Recipe")

 router.post("/", addRecipe)

module.exports = router