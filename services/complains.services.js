const complainModel=require('../models/complains.model');
const createError = require('http-errors');

module.exports.addComplainClient=async(req,res,next)=>{

    const{clientDesc,ticketID,stuffName}=req.body;
    userId = req.userId
    clientId = req.userId
    
    await complainModel.insertMany({ticketID,clientDesc,clientId:userId,stuffName});
    complain = await complainModel.findOne({ticketID});
    res.status(201).json({
      meg:"Complain added",
      isError:false,
      data:complain
    });

}

module.exports.addComplainStuff=async(req,res,next)=>{

    const{stuffDesc,ticketID,clientName}=req.body;
    userId = req.userId
    stuffId = req.userId
    
    
    await complainModel.insertMany({ticketID,stuffDesc,stuffId:userId,clientName});
    complain = await complainModel.findOne({ticketID});
    res.status(201).json({
      meg:"Complain added",
      isError:false,
      data:complain
    });

}

module.exports.getAllComplains=async(req,res,next)=>{
    
    complains = await complainModel.find();

    console.log(complains);

    res.status(201).json({
        meg:"All Complains",
        isError:false,
        data:complains
      });
}


module.exports.deleteAll=async(req,res,next)=>{
    
    await complainModel.delete();

    res.status(201).json({
        meg:"All Complains",
        isError:false,
        data:""
      });
}


