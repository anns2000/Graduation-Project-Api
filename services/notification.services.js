const createError = require('http-errors');
const notificationModel = require('../models/notification.model');


module.exports.updateFcmToken = async (req, res, next) => {
  try {
      const { fcmToken } = req.body;
      const user = await userModel.findByIdAndUpdate({ _id: req.id }, { fcmToken });
      res.status(201).json({
          meg: "Update Sucsess",
          isError: false,
          data: user
      });
  } catch (error) {
      return next(createError(405, 'server maintenance now please try again later'));
  }
}

module.exports.getAllNotificationsById = async (req, res, next) => {
  try {
    const userId = req.id;
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