const { auth } = require('../middelware/auth')
const { addTimeTable, getTimeTable, deleteTimeTable } = require('../services/timetable.services')

const Route=require('express').Router()

//building 

Route.post('/',auth,addTimeTable)
Route.get('/',auth,getTimeTable)
Route.delete('/',auth,deleteTimeTable)




module.exports=Route