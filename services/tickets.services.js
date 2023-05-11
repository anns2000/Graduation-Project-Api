
const ticketModel = require('../models/tickets.model');
const createError = require('http-errors');
const system=require('./system');
const timeTableModel = require('../models/timeTable.model');
const userModel = require('../models/user.model');





module.exports.submitTicket = async (req, res, next) => {
  try {
    const { title, desc, createdBy, buildingId } = req.body;
    const userId = req.userId;

    const ticketData = await ticketModel.insertMany({ title, desc, createdBy, buildingId, userId, ticketTime: new Date() });
    
    let timeTable= await timeTableModel.findOne({isActive:true});
    const userDepartment =await userModel.findOne({_id:userId});

    const index = timeTable.priorityList.findIndex((element) => element.departmentName === userDepartment.department); 
    

    
      system.addTicket({
        id:ticketData[0].id,
        priority:index+1,
      });
      const arr=system.print()
      console.log(arr);

    res.status(201).json({
      meg: "Ticket Submited",
      isError: false,
      data: ticketData
    });
  } catch (error) {
    console.log(error.message);
    return next(createError(405, 'server maintenance now please try again later'))

  }
};
module.exports.CancelTicket = async (req, res, next) => {
  try {
    const{id}=req.body
    userId = req.userId
    
     await ticketModel.findByIdAndUpdate({ _id: id }, { status: "canclled" })
     const ret=  system.cancelTicket(id);
    if(!ret)
    {
      return next(createError(201,"this ticket not in our system pls call the admin"));
    }

     console.log("ret=>",ret);
      res.status(201).json({
        meg: "canclled",
        isError: false,
        data: []
      });
    
    

  } catch (error) {
    console.log(error.message);
    return next(createError(405, 'server maintenance now please try again later'))

  }

};
module.exports.allTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.find({ status: { $in: ['inQueue', 'inProgress'] } }).populate("createdBy", "photo name department ");
    if (Ticket.length == 0) {
      return next(createError(201, "There's no tickets"));
    }
    else {
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data: Ticket
      });
    }

  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))

  }

};
module.exports.allInQueueTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.findMany({ status: 'inQueue' }).populate("createdBy", "photo name department ");
    if (Ticket.length == 0) {
      return next(createError(201, "There's no tickets"));
    }
    else {
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data: Ticket
      });
    }

  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))

  }

};
module.exports.allInProgressTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.findMany({ status:'inProgress'}).populate("createdBy", "photo name department ");
    if (Ticket.length == 0) {
      return next(createError(201, "There's no tickets"));
    }
    else {
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data: Ticket
      });
    }

  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

};
module.exports.getUserTickets = async (req, res, next) => {
  try {
    const createdBy = req.userId;

  let userTickets = await ticketModel.find({ createdBy });

  if (userTickets.length == 0) {

    return next(createError(201, "this user has no ticket"))

  }
  else {

    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data: userTickets
    });

  }
  } catch (error) {
    return next(createError(405,'server maintenance now please try again later'))

  }
  
}
module.exports.getQueueTickets=async(req,res,next)=>{
  try {
    const arr=system.print()

    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data  : arr,
    });

    
  } catch (error) {
        return next(createError(405,'server maintenance now please try again later'))

  }
}