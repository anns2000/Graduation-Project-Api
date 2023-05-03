///Auther Mario Ktkt 


const ticketModel = require('../models/tickets.model');
const createError = require('http-errors');


module.exports.submitTicket=async(req,res)=>{
  try{
    const {title, desc, createdBy,building} = req.body;
    await ticketModel.insertMany({title,desc,createdBy,building});
    const ticketData = await ticketModel.findOne({title,desc,createdBy,building})
    res.status(201).json({
        meg:"Ticket Submited",
        isError:false,
        data: ticketData
      });
    }catch(error){
      console.log(error);
    }
}

module.exports.deleteTicket=async(req,res)=>{
    
    const dele=await ticketModel.findById(id);
    if(dele)
    {
        await ticketModel.findByIdAndRemove(id);
        const ticket= await ticketModel.find();
        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:ticket
          });    }
    else
    {
        return next(createError(201,"Something Wrong!!!"));
    }
}


module.exports.allTickets = async (req, res,next) => {
    let Ticket = await ticketModel.find({}).populate("createdBy", "title desc building");
    if(Ticket.length==0)
    {
      return next(createError(201,"There's no tickets"));
    }
    else
    {
    res.status(201).json({
        meg:"sucsess",
        isError:false,
        data:Ticket
      });
    }
};
    

module.exports.getUserTickets=async(req,res)=>{
    const createdBy = req.header("id");

    let userTickets = await ticketModel.find({ createdBy });

    if(userTickets.length==0)
    {

    res.status(201).json({
        meg:"there is no tickets ",
        isError:true,
        data:[]
      });

    }
    else
    {

    res.status(201).json({
        meg:"sucsess",
        isError:false,
        data:userTickets
      });

    }
    }
