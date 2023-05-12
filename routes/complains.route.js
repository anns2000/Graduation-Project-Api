const Route=require('express').Router()
const { auth } = require('../middelware/auth');
const {getAllComplains, addComplainStuff, addComplainClient } = require('../services/complains.services');


Route.post('/addComplainClient',addComplainClient)
Route.post('/addComplainStuff',addComplainStuff)

Route.get('/',getAllComplains)

module.exports=Route