const { auth } = require('../middelware/auth')
const { addTimeTable, getTimeTable, deleteTimeTable, openTimeTable, updateTimeTable } = require('../services/timetable.services')

const Route=require('express').Router()

//building 

Route.post('/',auth,addTimeTable)
Route.get('/',auth,getTimeTable)
Route.delete('/',auth,deleteTimeTable)
Route.post('/setTime',auth,openTimeTable)
Route.post('/updateTimeTable',auth,updateTimeTable)




module.exports=Route