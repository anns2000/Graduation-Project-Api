const admin = require('./firebaseAdmin'); 
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
      data: notifications ??[]
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
module.exports.pushNotificationsBytoken = async (fcmToken, title, message , type ) => {
  try {
    const payload = {
      notification: {
        title,
        body: message,
        type:"1"
      },
    };


   const res=await admin.messaging().sendToDevice(fcmToken, payload);
    return res;
 
    
  } catch (error) {
    console.log(error);
  }
}
module.exports.seenById = async (req,res,next) =>{
  try {
    const {userId} = req.userId;
    const {notId} = req.body;
    await notificationModel.findByIdAndUpdate({_id:notId,userId:userId},{isSeen:true});
    res.status(201).json({
      meg: "seen notification",
      isError: false,
      data: []
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}
module.exports.markAllRead = async (req,res,next) =>{
  try {
    const {userId} = req.userId;
    await notificationModel.updateMany({userId:userId},{isSeen:true});
    res.status(201).json({
      meg: "seen all notifications",
      isError: false,
      data: []
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}
module.exports.adminGetAll = async (req, res, next) => {
  try {
    const notifications = await notificationModel.find();
    res.status(201).json({
      meg: "sucsses",
      isError: false,
      data: notifications ?? []
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}



