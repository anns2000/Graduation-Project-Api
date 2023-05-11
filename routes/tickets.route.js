

const { auth } = require('../middelware/auth');

const { submitTicket,  allTickets, getUserTickets, CancelTicket, getQueueTickets, allInQueueTickets, allInProgressTickets, acceptTickets } = require('../services/tickets.services')

const Route = require('express').Router()

Route.post('/submitTicket',auth,submitTicket);
Route.post('/cancel',auth,CancelTicket);
Route.get('/allTickets',auth,allTickets);
Route.get('/getUserTickets',auth,getUserTickets);
Route.get('/getQueueTickets',auth,getQueueTickets);
Route.get('/allInQueueTickets',auth,allInQueueTickets);
Route.get('/allInProgressTickets',auth,allInProgressTickets);
Route.post('/acceptTicket',auth,acceptTickets);

module.exports = Route