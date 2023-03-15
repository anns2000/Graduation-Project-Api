const { addDepartment, getAll, deleteDepartment } = require('../services/department.services')

const Route=require('express').Router()


Route.post('/',addDepartment)
Route.get('/',getAll)
Route.delete('/',deleteDepartment)





module.exports=Route