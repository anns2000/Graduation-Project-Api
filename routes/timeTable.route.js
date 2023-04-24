const { addTimeTable, getTimeTable, deleteTimeTable } = require('../services/timetable.services')

const Route=require('express').Router()

//building 
Route.post('/',addTimeTable)
Route.get('/',getTimeTable)
Route.delete('/',deleteTimeTable)




module.exports=Route