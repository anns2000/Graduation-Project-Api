const mongoose=require('mongoose')

const qAndAschema=mongoose.Schema({


    question:String,
    answer:String
},{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
                delete ret.__v;
        }
    }
})

module.exports=mongoose.model('question',qAndAschema)