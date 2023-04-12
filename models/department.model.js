const mongoose=require('mongoose')

const departmentSchema=mongoose.Schema({


    name:String,
},{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
                delete ret.__v;
        }
    }
},)

module.exports=mongoose.model('department',departmentSchema)