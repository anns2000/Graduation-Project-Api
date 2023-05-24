

const { auth } = require('../middelware/auth');
const { updateFcmToken, getAllNotificationsById, pushNotificationsBytoken, seenById, markAllRead, adminGetAll } = require('../services/notification.services');

const Route = require('express').Router()

Route.post('/updateFcmToken',auth,updateFcmToken);
Route.get('/',auth,getAllNotificationsById);
Route.post('/send-notification',auth,pushNotificationsBytoken);
Route.post('/seenNotifiById',auth,seenById);
Route.put('/markAllRead',auth,markAllRead);
Route.get('/adminGetAll',adminGetAll);

module.exports = Route