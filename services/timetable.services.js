const timeTableModel = require("../models/timeTable.model");

module.exports.addTimeTable= async (req,res,next)=>{

    const {name ,priorityList}=req.body


      await timeTableModel.insertMany({name,priorityList})


}