///Auther Mario Ktkt 


const { auth } = require('../middelware/auth');

const Route = require('express').Router()

Route.post('/updateFcmToken',auth,updateFcmToken);
Route.put('/',auth,CancelTicket);
Route.get('/',auth,allTickets);
Route.get('getUserTickets',auth,getUserTickets);


module.exports = Route