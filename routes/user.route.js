const { auth } = require('../middelware/auth')
const { addUser, getAll, deleteUser, 
        getAllClient, getAllStaff,updateUser, signin, getbyId, addrating }
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
Route.post('/update',uploadSingleFile(),updateUser)


Route.put('/update',uploadSingleFile(),updateUser)
Route.put('/addRating',addrating)
Route.get('/userRating')



module.exports=Route