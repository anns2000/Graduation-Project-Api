const { auth } = require('../middelware/auth')
const { addUser, getAll, deleteUser, 
        getAllClient, getAllStaff,updateUser, signin, getbyId }
         =require('../services/user.services')
const { uploadSingleFile } = require('../utils/fileUpload')

const Route=require('express').Router()

//user
Route.post('/',addUser)
Route.get('/',getAll)
Route.delete('/',deleteUser)

Route.get('/getbyId',getbyId)
Route.get('/client',getAllClient)
Route.get('/stuff',getAllStaff)
Route.post('/login',signin)
Route.put('/update',uploadSingleFile(),updateUser)





module.exports=Route