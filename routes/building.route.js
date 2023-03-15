const { getAll, addBuilding, deleteBuilding, } = require('../services/building.services')

const Route=require('express').Router()


Route.post('/',addBuilding)
Route.get('/',getAll)
Route.delete('/',deleteBuilding)





module.exports=Route