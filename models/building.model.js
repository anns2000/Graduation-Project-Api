const mongoose=require('mongoose')

const buildingSchema=mongoose.Schema({


    name:String,
    
})

module.exports=mongoose.model('building',buildingSchema)