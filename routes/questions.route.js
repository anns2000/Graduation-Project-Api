const { addQuestion, getAll, deleteOne } = require('../services/questions.services')

const Route=require('express').Router()

//building 
Route.post('/',addQuestion)
Route.get('/',getAll)
Route.delete('/',deleteOne)




module.exports=Route