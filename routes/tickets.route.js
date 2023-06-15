

const { auth } = require('../middelware/auth');
const { submitTicket,  allTickets, getUserTickets,
     CancelTicket, getQueueTickets,  
     allInProgressTickets, acceptTickets,
      getCllintTicket, 
      allinQueueTickets,
      closeTicket,
      getStuffTicket,
      getTicketById} = require('../services/tickets.services')

const Route = require('express').Router()

Route.post('/submitTicket',auth,submitTicket);
Route.post('/cancel',auth,CancelTicket);
Route.post('/close',auth,closeTicket);
Route.get('/allTickets',auth,allTickets);
Route.get('/getUserTickets',auth,getUserTickets);
Route.get('/getQueueTickets',auth,getQueueTickets);
Route.get('/allInQueueTickets',auth,allinQueueTickets);
Route.get('/allInProgressTickets',auth,allInProgressTickets);
Route.post('/acceptTicket',auth,acceptTickets);
Route.get('/getCllintTicket',auth,getCllintTicket);
Route.get('/getStuffTicket',auth,getStuffTicket);
Route.get('/getTicketById',auth,getTicketById);




module.exports = Route