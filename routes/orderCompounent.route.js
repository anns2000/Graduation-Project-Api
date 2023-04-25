///Auther Mario Ktkt 

const { orderComp, sendComp, getAllComp } = require('../services/orderCompounent.services')

const Route=require('express').Router()


Route.post('/orderComp',orderComp);
Route.post('/sendComp',sendComp);
Route.get('/getAllComp',getAllComp);

module.exports = Route
