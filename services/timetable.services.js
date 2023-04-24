const questionsModel = require("../models/questions.model");
const timeTableModel = require("../models/timeTable.model")
const createError = require('http-errors');


module.exports.addTimeTable=async(req,res,next)=>{

const {name , priorityList}= req.body

    await timeTableModel.insertMany
    await questionsModel.insertMany({question,answer});
    
    questions= await questionsModel.find();
    res.status(201).json({
      meg:"added successfully",
      isError:false,
      data:questions
    });
}
