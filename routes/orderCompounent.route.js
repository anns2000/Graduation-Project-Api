///Auther Mario Ktkt 

const { auth } = require('../middelware/auth');
const { orderComp, sendComp, getAllComp } = require('../services/orderCompounent.services')

const Route=require('express').Router()

Route.post('/',auth,orderComp);
Route.post('/sendComp',auth,sendComp);
Route.get('/',getAllComp);

module.exports = Route
