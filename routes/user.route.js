const { auth } = require('../middelware/auth')
const { addUser, getAll, deleteUser, 
        getAllClient, getAllStaff,updateUser, signin }
         =require('../services/user.services')

const Route=require('express').Router()

//user
Route.post('/',addUser)
Route.get('/',getAll)
Route.delete('/',deleteUser)

Route.get('/client',getAllClient)
Route.get('/stuff',getAllStaff)
Route.post('/login',signin)
Route.put('/update',updateUser)





module.exports=Route