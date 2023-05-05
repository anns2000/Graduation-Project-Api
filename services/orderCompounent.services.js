///Auther Mario Ktkt 

const { mongoose } = require('mongoose');
const compounentModel = require('../models/orderCompounent.model');
const createError = require('http-errors');

module.exports.orderComp = async (req, res) => {
  try {
    const { compounent } = req.body;
    const userId = mongoose.Types.ObjectId(req.userId);
    const orderData = await compounentModel.insertMany({ compounent, userId });
    console.log(orderData);
    res.status(201).json({
      meg: "Your Order Submited",
      isError: false,
      data: orderData
    });
  } catch (e) {
    console.log(e);
    res.status(201).json({
      meg: e,
      isError: true,
      data: {},

    });
  }
}

module.exports.sendComp = async (req, res) => {
  const { compounent, isSend } = req.body;
  await compounentModel.insertMany({ compounent, isSend });
  const sendData = await compounentModel.findOne({ compounent, ticketId, isSend })
  res.status(201).json({
    meg: "Compuonent Sent",
    isError: false,
    data: sendData
  });
}

module.exports.getAllComp = async (req, res) => {
  let compounent = await compounentModel.find({}).populate("ticketId", "compounent isSend");
  if (compounent) {
    res.status(201).json({
      meg: "sucsess",
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
}