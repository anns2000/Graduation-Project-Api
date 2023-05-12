
const ticketModel = require('../models/tickets.model');
const createError = require('http-errors');
const system=require('./system');
const timeTableModel = require('../models/timeTable.model');
const userModel = require('../models/user.model');





module.exports.submitTicket = async (req, res, next) => {
  try {
    const { title, desc, buildingId } = req.body;
    const userId = req.userId;
    const oldTicket=await ticketModel.find({createdBy:userId,  status: { $in: ["inQueue", "inProgress"] }
  });
    if(oldTicket)
    {
      return next(new createError(201,"this user have inQueue or inProgress ticket"))
    }
    const ticketData = await ticketModel.insertMany({ title, desc, createdBy:userId, buildingId, userId, ticketTime: new Date() });
    let timeTable= await timeTableModel.findOne({isActive:true});
    const userDepartment =await userModel.findOne({_id:userId});

    const index = timeTable.priorityList.findIndex((element) => element.departmentName === userDepartment.department); 
      system.addTicket({
        id:ticketData[0].id,
        priority:index+1,
      });
      const arr=system.print()

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
    let Ticket = await ticketModel.find({ status: 'inQueue' }).populate("createdBy", "photo name department ");
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
    let Ticket = await ticketModel.find({ status:'inProgress'}).populate("createdBy", "photo name department ");
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
    const myArray = [];
    const arr=system.print()
    for(let i=0;i<arr.length;i++)
    {
      
      let data=await ticketModel.find({_id:arr[i].id})
      .select("title status desc building ")
      .populate("createdBy","name , photo , department ");
      myArray.push(data[0]);
    }

    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data  : myArray,
    });

    
  } catch (error) {
    console.log(error.message)
        return next(createError(405,'server maintenance now please try again later'))

  }
}
module.exports.acceptTickets=async(req,res,next)=>{
  try {
    const {id}=req.body
    const ticket=system.cancelTicket(id);
    if(!ticket)
    {
      return next(createError(201, "This ticket id is wrong"));
    }
    await ticketModel.findByIdAndUpdate({_id:id},{status:"inProgress",ticketTime:new Date () });
    const find= await ticketModel.find({_id:id});
    res.status(201).json({
      meg: "ticket accpeted",
      isError: false,
      data  : find,
    });




    
  } catch (error) {
    console.log(error.message)
        return next(createError(405,'server maintenance now please try again later'))

  }
}
module.exports.getCllintTicket=async(req,res,next)=>{
  try {
   userId=req.userId;
    console.log(userId)
   let data=await ticketModel.find({createdBy:userId,  status: { $in: ["inQueue", "inProgress"] }
     }   )
      .select("title status building ")
      .populate("createdBy","name , department ").populate("workBy","name , department ");
     //fix me data[0] wrong
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data  : data[0],
      });
  } catch (error) {
        return next(createError(405,'server maintenance now please try again later'))

  }
}

module.exports.getTicketInfo= async(req,res,next)=>{
  const {ticketId} = req.header;

  try {
  const info = await ticketModel.find(ticketId);
    
  res.status(201).json({
    meg: "sucsess",
    isError: false,
    data  : info
  });

  }catch(error){
    return next(createError(405,'this user has no ticket'))
  }

}