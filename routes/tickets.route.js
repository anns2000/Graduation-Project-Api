///Auther Mario Ktkt 


const { auth } = require('../middelware/auth');
const { submitTicket,  allTickets, getUserTickets, CancelTicket, allInProgressTickets, allInQueueTickets } = require('../services/tickets.services')

const Route = require('express').Router()

Route.post('/submitTicket',auth,submitTicket);
Route.put('/deleteTicket',auth,CancelTicket);
Route.get('/allTickets',auth,allTickets);
Route.get('/allInProgressTickets',auth,allInProgressTickets);
Route.get('/allInQueueTickets',auth,allInQueueTickets);
Route.get('getUserTickets',auth,getUserTickets);


module.exports = Route