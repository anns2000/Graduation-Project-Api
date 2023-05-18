
const ticketModel = require('../models/tickets.model');
const createError = require('http-errors');
const system=require('./system');
const timeTableModel = require('../models/timeTable.model');
const userModel = require('../models/user.model');
const complainModel=require('../models/complains.model');





module.exports.submitTicket = async (req, res, next) => {
  try {
    const { title, desc, buildingId } = req.body;
    const userId = req.userId;
    const oldTicket=await ticketModel.findOne({createdBy:userId,status: { $in: ["in Queue", "in Progress"] }});
   
    //console.log(oldTicket);
    if(oldTicket)
    {
      return next(new createError(201,"this user have in Queue or in Progress ticket"))
    }
    const ticketData = await ticketModel.insertMany({ title, desc, createdBy:userId, building:buildingId , userId, ticketTime: new Date() });
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
    let Ticket = await ticketModel.find({ status: { $in: ['in Queue', 'in Progress'] } }).populate("createdBy", "photo name department ");
    
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data: Ticket??[]
      });
    

  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))
  }

};
module.exports.allinQueueTickets = async (req, res, next) => {
  try {
    let Ticket = await ticketModel.find({ status: 'in Queue' }).populate("createdBy", "photo name department ");
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
    let Ticket = await ticketModel.find({ status:'in Progress'}).populate("createdBy", "photo name department ");
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
      
      let data=await ticketModel.findOne({_id:arr[i].id})
      .select("title status desc building ")
      .populate("createdBy","name , photo , department ");
      console.log(data)
      data.priority=arr[i].priority;
      
      myArray.push(data);
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
    console.log(ticket);
    if(!ticket)
    {
      return next(createError(201, "This ticket id is wrong"));
    }
    await ticketModel.findByIdAndUpdate({_id:id},{status:"in Progress",ticketTime:new Date (),workBy :req.userId });
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
   let data=await ticketModel.find({createdBy:userId,  status: { $in: ["in Queue", "in Progress"] }
  }   )
  .select("title status building ticketTime createdBy workBy ")
  .populate("createdBy","name , department ")
  .populate("workBy"," name ");
  //console.log(data)
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
module.exports.getStuffTicket=async(req,res,next)=>{
  try {
   userId=req.userId;
   let data=await ticketModel.find({workBy:userId,  status: { $in: ["in Queue", "in Progress"] }
  }   )
  .select("title status building ticketTime createdBy workBy ")
  .populate("createdBy","name , department ")
  .populate("workBy"," name ").populate("building"," name ");
      res.status(201).json({
        meg: "sucsess",
        isError: false,
        data  : data[0],
      });
  } catch (error) {
        return next(createError(405,'server maintenance now please try again later'))

  }
}


module.exports.closeTicket = async (req, res, next) => {
  try {
    const {usedCompounent,
      problemDes,
      complainDes} =req.body
    userId = req.userId
    userName=req.userName
    const ticket= await ticketModel.findOne({ workBy: userId ,status:"in Progress"  });
   // console.log("ticket",ticket)
    let ret=[];
    if(ticket)
    {
      await ticketModel.findOneAndUpdate({ workBy: userId ,status:"in Progress"  },{status:"closed",usedCompounent,problemDes});
      ret= await ticketModel.findOne({_id:ticket._id})
      if(complainDes.length>1)
      {
          const complain=await complainModel.findOne({ticketId:ticket._id});
          if(complain)
          {
             await complainModel.findOneAndUpdate({ticketId:ticket._id},{stuffId:userId,stuffName:userName,stuffDesc:complainDes});
             const com=await complainModel.findOne({ticketId:ticket._id});
             
          }
          else
          {
            const com =await complainModel.insertMany({stuffId:userId,stuffName:userName,stuffDesc:complainDes,ticketId:ticket._id});
           // console.log(com,ticket._id);
          }
      }
      
    }
    else
    {
      return next(createError(201,"you donot have ticket to close"));
    }

      res.status(201).json({
        meg: "done",
        isError: false,
        data: ret
      });
    
    

  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))

  }

};