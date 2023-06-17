const complainModel = require('../models/complains.model');
const createError = require('http-errors');

module.exports.addComplainClient = async (req, res, next) => {


  try {
    const { clientDesc, ticketID, stuffName } = req.body;
    userId = req.userId
    clientId = req.userId

    await complainModel.insertMany({ ticketID, clientDesc, clientId: userId, stuffName });
    complain = await complainModel.findOne({ ticketID });
    res.status(201).json({
      meg: "Complain added",
      isError: false,
      data: complain
    });

  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}

module.exports.addComplainStuff = async (req, res, next) => {

  try {
    const { stuffDesc, ticketID, clientName } = req.body;
    userId = req.userId
    stuffId = req.userId


    await complainModel.insertMany({ ticketID, stuffDesc, stuffId: userId, clientName });
    complain = await complainModel.findOne({ ticketID });
    res.status(201).json({
      meg: "Complain added",
      isError: false,
      data: complain
    });

  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}

module.exports.getAllComplains = async (req, res, next) => {

  try {
    complains = await complainModel.find();


    res.status(201).json({
      meg: "All Complains",
      isError: false,
      data: complains ?? []
    });
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}


module.exports.deleteAll = async (req, res, next) => {

  try {
    await complainModel.delete();

    res.status(201).json({
      meg: "All Complains",
      isError: false,
      data: ""
    });
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}


