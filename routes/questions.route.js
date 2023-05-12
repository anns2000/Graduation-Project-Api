const { addQuestion, getAll, deleteOne } = require('../services/questions.services')

const Route=require('express').Router()

Route.post('/',addQuestion)
Route.get('/',getAll)
Route.delete('/',deleteOne)




module.exports=Route