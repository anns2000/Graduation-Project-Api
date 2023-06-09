const mongoose=require('mongoose')

const buildingSchema=mongoose.Schema({
    name:String,
},
{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
                delete ret.__v;
        }
    }
},)

module.exports=mongoose.model('building',buildingSchema)