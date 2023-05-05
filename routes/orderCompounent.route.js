///Auther Mario Ktkt 

const { auth } = require('../middelware/auth');
const { orderComp, getAllComp, orderResponse } = require('../services/orderCompounent.services')

const Route=require('express').Router()

Route.post('/',auth,orderComp);
Route.post('/orderResponse',auth,orderResponse);
Route.get('/',getAllComp);

module.exports = Route
