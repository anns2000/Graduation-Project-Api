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
module.exports.openTimeTable=async(req,res,next)=>{

  try {
    const {id}=req.body;

    await timeTableModel.findOneAndUpdate({isActive:true},{isActive:false});
    await timeTableModel.findOneAndUpdate({_id:id},{isActive:true});


    res.status(201).json({
      meg:" successfully",
      isError:false,
      data:[]
    });

    
  } catch (error) {
    console.log(error);
            return next(createError(405,'server maintenance now please try again later'))
  }
}
module.exports.updateTimeTable=async(req,res,next)=>{

  try {
    const {name , priorityList,id,isActive}= req.body
    console.log(id);
    await timeTableModel.findOneAndUpdate({_id:id},{name,priorityList,isActive})  
    const time=await timeTableModel.find({_id:id});

    res.status(201).json({
      meg:"updated",
      isError:false,
      data:time
    });

    
  } catch (error) {
            return next(createError(405,'server maintenance underway please try again later'))
  }
}
