

const { auth } = require('../middelware/auth');
const { updateFcmToken, getAllNotificationsById, pushNotificationsBytoken } = require('../services/notification.services');

const Route = require('express').Router()

Route.post('/updateFcmToken',auth,updateFcmToken);
Route.get('/',auth,getAllNotificationsById);
Route.post('/send-notification',auth,pushNotificationsBytoken);


module.exports = Route