const admin = require('../firebase.json'); 
const createError = require('http-errors');
const notificationModel = require('../models/notification.model');
const userModel = require('../models/user.model');


module.exports.updateFcmToken = async (req, res, next) => {
  try {
      const { fcmToken } = req.body;
      const user = await userModel.findByIdAndUpdate({ _id: req.userId }, { fcmToken });
      res.status(201).json({
          meg: "Update Sucsess",
          isError: false,
          data: user
      });
  } catch (error) {
    console.log(error);
      return next(createError(405, 'server maintenance now please try again later'));
  }
}

module.exports.getAllNotificationsById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const notifications = await notificationModel.find(userId);
    await notificationModel.updateMany({},{isSeen : true});
    res.status(201).json({
      meg: "Sucsess",
      isError: false,
      data: notifications
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}
module.exports.pushNotificationsById = async (req, res, next) => {
  try {
    const { userId, state, desc, title, type } = req.body;
    const notifications = await notificationModel.insertMany(userId, state, desc, title, type);
    res.status(201).json({
      meg: "Add Sucsess",
      isError: false,
      data: notifications
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}
module.exports.pushNotificationsBytoken = async (req, res, next) => {
  try {
    const { fcmToken, title, message } = req.body;
    const payload = {
      notification: {
        title,
        body: message,
      },
    };

    admin.messaging().sendToDevice(fcmToken, payload)
    .then(response => {
      console.log('Notification sent successfully:', response);
      res.status(200).json({ message: 'Notification sent successfully' });
    })
    .catch(error => {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    });
    
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}