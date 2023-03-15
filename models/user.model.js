const mongoose=require('mongoose')

const userSchema=mongoose.Schema({

username:String,
password:String,
role:String,
rate:{
    type:Number,
    default:0
},
department:{
    type:String,
    ref:"department"
},
totalTickets:{
    type:Number,
    default:0
},
rejectedTickets:{
    type:Number,
    default:0
},
name:String,  
})

module.exports=mongoose.model('user',userSchema)