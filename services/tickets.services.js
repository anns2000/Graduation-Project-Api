
const ticketModel = require('../models/tickets.model');
const createError = require('http-errors');
const system = require('./system');
const timeTableModel = require('../models/timeTable.model');
const userModel = require('../models/user.model');
const complainModel = require('../models/complains.model');
const { pushNotificationsBytoken } = require('./notification.services');
const notificationModel = require('../models/notification.model');


module.exports.submitTicket = async (req, res, next) => {
  try {
    const { title, desc, buildingId } = req.body;
    const userId = req.userId;
    const oldTicket = await ticketModel.findOne({ createdBy: userId, status: { $in: ["in Queue", "in Progress"] } });

    //console.log(oldTicket);
    if (oldTicket) {
      return next(new createError(201, "this user have in Queue or in Progress ticket"))
    }

    const ticketData = await ticketModel.insertMany({ title, desc, createdBy: userId, building: buildingId, userId, ticketTime: new Date() });
    let timeTable = await timeTableModel.findOne({ isActive: true });
    const userDepartment = await userModel.findOne({ _id: userId });

    const index = timeTable.priorityList.findIndex((element) => element.departmentName === userDepartment.department);
    system.addTicket({
      id: ticketData[0].id,
      priority: (timeTable.priorityList.length - index) * -1,
    });

    //const arr = system.print()
    const user = await userModel.find({ role: "stuff" })

    for (let i = 0; i < user.length; i++) {
     
      await notificationModel.insertMany({ title: "new Ticket", desc: "there is new ticker", userId: user[i]._id ,type:"newTicket",state:"normal",Data:(ticketData[0].id).toString()});
     
      if (user[i].fcmToken) {
        console.log(user[i].fcmToken);
       
        const data = await pushNotificationsBytoken(user[i].fcmToken, "new Ticket", "there is new ticker",ticketData[0].id)
      }

    }

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
    const { id } = req.body
    userId = req.userId

    await ticketModel.findByIdAndUpdate({ _id: id }, { status: "canclled" })
    const ret = system.cancelTicket(id);
    if (!ret) {
      return next(createError(201, "this ticket not in our system pls call the admin"));
    }

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
      data: Ticket ?? []
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
    let Ticket = await ticketModel.find({ status: 'in Progress' }).populate("createdBy", "photo name department ");
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
    const id = req.userId;

    let clientTickets = await ticketModel.find({ createdBy: id });
    let stuffTickets = await ticketModel.find({ workBy: id });

    if (clientTickets.length == 0 && stuffTickets.length == 0) {

      return next(createError(201, "this user has no ticket"))

    }
    else {
      if (clientTickets.length != 0) {
        res.status(201).json({
          meg: "sucsess",
          isError: false,
          data: clientTickets
        });
      } else {
        res.status(201).json({
          meg: "sucsess",
          isError: false,
          data: stuffTickets
        });
      }
    }
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }

}

module.exports.getQueueTickets = async (req, res, next) => {
  try {
    const myArray = [];
    const arr = system.print()
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {

      let data = await ticketModel.findOne({ _id: arr[i].id })
        .select("title status desc building ")
        .populate("createdBy", "name , photo , department ")
        .populate("building","name");
      const newData = { ...data.toObject(), priority: (arr[i].priority) * -1 };
      myArray.push(newData);
    }

    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data: myArray,
    });


  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))

  }
}
module.exports.acceptTickets = async (req, res, next) => {
  try {
    const { id } = req.body
    const ticket = system.cancelTicket(id);

    if (!ticket) {
      return next(createError(201, "This ticket id is wrong"));
    }
    await ticketModel.findByIdAndUpdate({ _id: id }, { status: "in Progress", ticketTime: new Date(), workBy: req.userId });
    const find = await ticketModel.find({ _id: id });
    console.log("ticket -> creater", find[0].createdBy)
    const user = await userModel.findOne({ _id: find[0].createdBy })
    console.log("user", user.fcmToken)

    await notificationModel.insertMany({ title: "Ticket Accepted", desc: "Your Ticket Has Been Accepted", userId: find[0].createdBy,type:"accepted",state:"safe",Data:(find[0]._id).toString()});
    if (user.fcmToken != "") {
      console.log(typeof (find[0].id));
      const data = await pushNotificationsBytoken(user.fcmToken, "Accepted", "Your Ticket Has Been Accepted", find[0]._id)
    }
    res.status(201).json({
      meg: "ticket accepted",
      isError: false,
      data: find,
    });

  } catch (error) {
    console.log(error.message)
    return next(createError(405, 'server maintenance now please try again later'))

  }
}
module.exports.getCllintTicket = async (req, res, next) => {
  try {
    userId = req.userId;
    let data = await ticketModel.find({
      createdBy: userId, status: { $in: ["in Queue", "in Progress"] }
    })
      .select("title status building ticketTime createdBy workBy ")
      .populate("createdBy", "name , department ")
      .populate("workBy", " name ").populate("building", " name ");
    //console.log(data)
    //fix me data[0] wrong
    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data: data[0],
    });
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }
}
module.exports.getStuffTicket = async (req, res, next) => {
  try {
    userId = req.userId;
    let data = await ticketModel.find({
      workBy: userId, status: { $in: ["in Queue", "in Progress"] }
    })
      .select("title status building ticketTime createdBy workBy ")
      .populate("createdBy", "name , department ")
      .populate("workBy", " name ").populate("building", " name ");
    res.status(201).json({
      meg: "sucsess",
      isError: false,
      data: data[0],
    });
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }
}


module.exports.closeTicket = async (req, res, next) => {
  try {
    const { usedCompounent,
      problemDes,
      complainDes } = req.body
    userId = req.userId
    userName = req.userName
    const ticket = await ticketModel.findOne({ workBy: userId, status: "in Progress" });
    // console.log("ticket",ticket)
    let ret = [];
    if (ticket) {
      await ticketModel.findOneAndUpdate({ workBy: userId, status: "in Progress" }, { status: "closed", usedCompounent, problemDes });
      ret = await ticketModel.findOne({ _id: ticket._id })
      if (complainDes.length > 1) {
        const complain = await complainModel.findOne({ ticketId: ticket._id });
        if (complain) {
          await complainModel.findOneAndUpdate({ ticketId: ticket._id }, { stuffId: userId, stuffName: userName, stuffDesc: complainDes });
          const com = await complainModel.findOne({ ticketId: ticket._id });

        }
        else {
          const user = await userModel.findOne({ _id: ticket.createdBy })
          console.log(user)

          const com = await complainModel.insertMany({ stuffId: userId, clientId: ticket.createdBy, clientName: user.name, stuffName: userName, stuffDesc: complainDes, ticketId: ticket._id });
        }
      }

    }
    else {
      return next(createError(201, "you donot have ticket to close"));
    }

    await notificationModel.insertMany({ title: "closed", desc: "Your Ticket Has Been closed", userId: ticket.createdBy,type:"closed",state:"normal",Data:(ticket._id).toString() });


    const owneruser = await userModel.findOne({_id:ticket.createdBy})

    const data = await pushNotificationsBytoken(owneruser.fcmToken, "closed", "Your Ticket Has Been closed",ticket._id)
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

module.exports.getTicketById = async (req, res, next) => {
  try {

   const {id}=req.body
   

    let data = await ticketModel.find({
      workBy: userId, status: { $in: ["in Queue", "in Progress"] }
    })
      .select("title status building ticketTime createdBy workBy ")
      .populate("createdBy", "name , department ")
      .populate("workBy", " name ").populate("building", " name ");
   
      res.status(201).json({
      meg: "sucsess",
      isError: false,
      data: data[0],
    });
  } catch (error) {
    return next(createError(405, 'server maintenance now please try again later'))

  }
}