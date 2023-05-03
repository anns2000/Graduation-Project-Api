///Auther Mario Ktkt 

const compounentModel = require('../models/orderCompounent.model');
const createError = require('http-errors');

module.exports.orderComp = async(req,res)=>{
const {compounent,ticketId,isSend} = req.body;
await compounentModel.insertMany({compounent,ticketId,isSend});
const orderData = await compounentModel.findOne({compounent,ticketId,isSend})
res.status(201).json({
    meg:"order Submited",
    isError:false,
    data: orderData
  });
}

module.exports.sendComp = async(req,res)=>{
    const {compounent,isSend} = req.body;
    await compounentModel.insertMany({compounent,isSend});
    const sendData = await compounentModel.findOne({compounent,ticketId,isSend})
    res.status(201).json({
        meg:"Compuonent Sent",
        isError:false,
        data: sendData
      });
    }
    
module.exports.getAllComp = async(req,res)=>{
    let compounent = await compounentModel.find({}).populate("ticketId", "compounent isSend");
    if(compounent)
    {      
    res.status(201).json({
        meg:"sucsess",
        isError:false,
        data:compounent
      });
    }
    else
    {
        res.status(201).json({
            meg:"there is no orders ",
            isError:true,
            data:[]
          });
    }
}