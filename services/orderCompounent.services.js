
const { mongoose } = require('mongoose');
const compounentModel = require('../models/orderCompounent.model');
const createError = require('http-errors');
const userModel = require('../models/user.model');
const { pushNotificationsBytoken } = require('./notification.services');
const notificationModel = require('../models/notification.model');



module.exports.orderComp = async (req, res, next) => {
  try {
    const { compounent } = req.body;
    const userId = new mongoose.Types.ObjectId(req.userId);
    const orderData = await compounentModel.insertMany({ compounent, user:userId });
    const user = await userModel.find({ role: "admin" })

    for (let i = 0; i < user.length; i++) {
     
      await notificationModel.insertMany({ title: "new order", desc: "You Have New Compounent order", userId: user[i]._id ,type:"newOrder",state:"normal",Data:""});
     
      if (user[i].fcmToken) {
        console.log(user[i].fcmToken);
       
        const data = await pushNotificationsBytoken(user[i].fcmToken, "new order", "You Have New Compounent order","")
      }

    }
    res.status(201).json({
      meg: "Your Order Submited",
      isError: false,
      data: orderData[0]
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}

module.exports.orderResponse = async (req, res, next) => {
  try {
    const { id, isAccepted } = req.body;
    const sendData = await compounentModel.findByIdAndUpdate({ _id: id }, { isSend: true, isAccepted });
    const data = await compounentModel.findOne({ _id: id });
    console.log(data);
    const user=await userModel.findOne({_id:data.user});
    console.log(data.user)
    console.log(user.fcmToken)

    const userId=req.userId
    let meg ="Accepted"
    let state="safe"
    if(!isAccepted)
    {
      meg="Rejected"
      state="danger"
    }
    await notificationModel.insertMany({ title: "order Result", desc: `You order has been ${meg}`, userId: data.user ,type:"orderResult",state:state,Data:""});

    const send = await pushNotificationsBytoken(user.fcmToken, "order Result", "You Have New Compounent order","")

    res.status(201).json({
      meg: "Compuonent Sent",
      isError: false,
      data
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}

module.exports.getAllComp = async (req, res, next) => {
  try {
    let compounent = await compounentModel.find({ isSend: false }).populate('user', 'name photo');

      res.status(201).json({
        meg: "Sucsess",
        isError: false,
        data: compounent ?? []
      });
    
   
  } catch (error) {
    console.log(error.message);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}