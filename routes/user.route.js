const { addUser, getAll } = require('../services/user.services')

const Route=require('express').Router()


Route.post('/',addUser)
Route.get('/',getAll)





module.exports=Route