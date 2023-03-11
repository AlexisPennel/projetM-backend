const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');
const plansRoutes = require('./routes/plans');

mongoose.set('strictQuery', true);

// Création app express et connexion MongoDB
const app = express();
mongoose.connect(`${process.env.MONGODB_URI}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Package helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Prise en charge JSON
app.use(express.json());

// Headers pour permettre des requêtes cross-origin  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Endpoints
app.use('/api/auth', authRoutes);

app.use('/api/recipes', recipesRoutes);

app.use('/api/plans', plansRoutes);

// Message d'erreur en cas d'endpoint inexistant 
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: `La page n'existe pas`})
} );


module.exports = app;