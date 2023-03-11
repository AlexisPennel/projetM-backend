const express = require('express');
const recipesCtrl = require('../controllers/recipes');
const auth = require('../middleware/auth');
const checkRecipe = require('../middleware/checkRecipe');
// const { sauceDataValidatorPost, sauceDataValidatorPut} = require("../middleware/sauceDataValidator")
const router = express.Router();

router.get('/', auth, recipesCtrl.getRecipes);

router.get('/:id', auth, recipesCtrl.getOneRecipe);

router.post('/', auth, checkRecipe, recipesCtrl.createRecipe);

router.put('/:id', auth, recipesCtrl.updateRecipe);

router.delete('/:id', auth, recipesCtrl.deleteRecipe);


module.exports = router;