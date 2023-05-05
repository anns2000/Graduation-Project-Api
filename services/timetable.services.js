const timeTableModel = require("../models/timeTable.model")
const createError = require('http-errors');


module.exports.addTimeTable=async(req,res,next)=>{

  try {
    const {name , priorityList}= req.body
    const timeTable=await timeTableModel.insertMany({name,priorityList})  


    res.status(201).json({
      meg:"added successfully",
      isError:false,
      data:timeTable
    });

    
  } catch (error) {
            return next(createError(405,'server maintenance underway please try again later'))
  }
}
module.exports.getTimeTable=async(req,res,next)=>{
  

  try {
    const timeTable=await timeTableModel.find();
    res.status(201).json({
      meg:"success",
      isError:false,
      data:timeTable
    });

    
  } catch (error) {
            return next(createError(405,'server maintenance underway please try again later'))
  }
}
module.exports.deleteTimeTable=async(req,res,next)=>{

  try {
    const {id}=req.body;

    await timeTableModel.findByIdAndRemove(id);
    const timeTable=await timeTableModel.find();


    res.status(201).json({
      meg:"deleted successfully",
      isError:false,
      data:timeTable
    });

    
  } catch (error) {
            return next(createError(405,'server maintenance now please try again later'))
  }
}
