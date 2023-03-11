const Recipes = require('../models/Recipes');

exports.getRecipes = (req, res, next) => {
    Recipes.find({userId: req.auth.userId})
        .then(Recipes => res.status(200).json(Recipes))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneRecipe = (req, res, next) => {
   Recipes.findOne({ _id: req.params.id })
        .then(Recipes => res.status(200).json(Recipes))
        .catch(error => res.status(404).json({ message: `The recipe doesn't exist` }));
};

exports.createRecipe = (req, res, next) => {
    const recipeObject = req.body;
    delete recipeObject._userId;

    const recipe = new Recipes({
        ...recipeObject,
        userId: req.auth.userId,
        name: recipeObject.name.trim(),
    })

    recipe.save()
        .then(() => { res.status(201).json({ message: 'Recipe created' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.updateRecipe = (req, res, next) => {
    const recipeObject = req.body;

    delete recipeObject._userId;
    recipeObject.name = recipeObject.name.trim();

    Recipes.findOne({ _id: req.params.id })
        .then((recipe) => {
            if (recipe.userId != req.auth.userId) {
                res.status(401).json({ message: 'No authorized' });
                return
            }

            Recipes.updateOne({ _id: req.params.id }, { ...recipeObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'recipe modified' }))
                .catch(error => res.status(401).json({ error }));

        })
        .catch((error) => {
            res.status(404).json({ message: `the recipe doesn't exist` });
        });
};

exports.deleteRecipe = (req, res, next) => {
    Recipes.findOne({ _id: req.params.id })
        .then(recipe => {
            if (recipe.userId != req.auth.userId) {
                res.status(401).json({ message: 'No authorized' });
                return
            }

            Recipes.deleteOne({ _id: req.params.id })
                .then(() => { res.status(204).json() })
                .catch(error => res.status(401).json({ error }));
        })
        
        .catch(error => {
            res.status(404).json({ message: 'Recipe not found' });
        })
};

