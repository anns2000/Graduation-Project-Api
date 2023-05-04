///Auther Mario Ktkt 


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
    const timeTable= await timeTableModel.find({isActive:true});
    const userDepartmentiD =await userModel.find({id:userId}).populate("department","id");
    console.log(userDepartmentiD);
    const index = timeTable.findIndex((element) => element.id === userDepartmentiD); 

    const task={
      id:ticketData.id,
      priority:index+1,
    };
      system.addTicket(task)
    res.status(201).json({
      meg: "Ticket Submited",
      isError: false,
      data: ticketData
    });
  } catch (error) {
    console.log(error);
    return next(createError(405, 'server maintenance now please try again later'))

  }
}

module.exports.CancelTicket = async (req, res, next) => {
  try {
    userId = req.userId

    const myTicket = await ticketModel.find({ createdBy: userId, status: "inQueue" });


    if (myTicket) {
      await ticketModel.findByIdAndUpdate({ id: myTicket.id }, { status: "canclled" })
      system.cancelTicket(myTicket.id);
      res.status(201).json({
        meg: "canclled",
        isError: false,
        data: myTicket
      });
    }
    else {
      return next(createError(201, "this user does not have inQueue ticket"));
    }

  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}


module.exports.allTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.findMany({ status: { $in: ['inQueue', 'inProgress'] } }, { status }).populate("createdBy", "photo name department ");
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
module.exports.allInQueueTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.findMany({ status: 'inQueue' }, { status }).populate("createdBy", "photo name department ");
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
module.exports.allInProgressTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.findMany({ status:'inProgress'}, { status }).populate("createdBy", "photo name department ");
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
