const Recipes = require('../models/Recipes');



const checkRecipe = async (req, res, next) => {
   const existingRecipe = await Recipes.findOne({name : req.body.name, ingredients: req.body.ingredients});
  
    if (!req.body.name || !req.body.ingredients){
        return res.status(400).json({message: 'No body'});
    }

    if (req.body.name.trim() === '') {
        return res.status(400).json({message : 'Please name your recipe'});
    }
    
    if (existingRecipe) {
        return res.status(400).json({message : 'Already exist'});
    } else {
     next()
    }
};

module.exports = checkRecipe;