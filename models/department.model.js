const mongoose=require('mongoose')

const departmentSchema=mongoose.Schema({


    name:String,
})

module.exports=mongoose.model('department',departmentSchema)