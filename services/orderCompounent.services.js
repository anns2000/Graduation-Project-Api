///Auther Mario Ktkt 

const { mongoose } = require('mongoose');
const compounentModel = require('../models/orderCompounent.model');
const createError = require('http-errors');

module.exports.orderComp = async (req, res, next) => {
  try {
    const { compounent } = req.body;
    console.log(req.userId);
    const userId = new mongoose.Types.ObjectId(req.userId);
    const orderData = await compounentModel.insertMany({ compounent, user:userId });
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
    const data = await compounentModel.find({ _id: id });
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
    if (compounent) {
      res.status(201).json({
        meg: "Sucsess",
        isError: false,
        data: compounent
      });
    }
    else {
      res.status(201).json({
        meg: "there is no orders ",
        isError: true,
        data: []
      });
    }
  } catch (error) {
    console.log(error.message);
    return next(createError(405, 'server maintenance now please try again later'));
  }
}