///Auther Mario Ktkt 


const { submitTicket, deleteTicket, allTickets, getUserTickets } = require('../services/tickets.services')

const Route = require('express').Router()

Route.post('/submitTicket',submitTicket);
Route.delete('/deleteTicket',deleteTicket);
Route.get('/allTickets',allTickets);
Route.get('getUserTickets',getUserTickets);


module.exports = Route