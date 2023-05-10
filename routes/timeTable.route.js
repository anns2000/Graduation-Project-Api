const { auth } = require('../middelware/auth')
const { addTimeTable, getTimeTable, deleteTimeTable, openTimeTable } = require('../services/timetable.services')

const Route=require('express').Router()

//building 

Route.post('/',auth,addTimeTable)
Route.get('/',auth,getTimeTable)
Route.delete('/',auth,deleteTimeTable)
Route.put('/setTime',auth,openTimeTable)




module.exports=Route