const { auth } = require('../middelware/auth')
const { addQuestion, getAll, deleteOne, agora } = require('../services/questions.services')

const Route=require('express').Router()

Route.post('/',addQuestion)
Route.get('/',getAll)
Route.delete('/',deleteOne)
Route.post('/gettoken',auth,agora)



module.exports=Route