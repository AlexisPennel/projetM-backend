const mongoose = require('mongoose');

const RecipesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: Array },
});

module.exports = mongoose.model('Recipes', RecipesSchema);