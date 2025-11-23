const express = require('express');

const planetRouter = require('./planets/planets.routes');
const launchesRouter = require('./launches/launches.routes');


const api = express.Router()

api.use("/planets", planetRouter);
api.use('/launches', launchesRouter);

module.exports = api;