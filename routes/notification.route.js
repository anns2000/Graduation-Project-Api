

const { auth } = require('../middelware/auth');
const { updateFcmToken, getAllNotificationsById } = require('../services/notification.services');

const Route = require('express').Router()

Route.post('/updateFcmToken',auth,updateFcmToken);
Route.get('/',auth,getAllNotificationsById);


module.exports = Route