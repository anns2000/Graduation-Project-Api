const mongoose=require('mongoose')

const complainSchema = mongoose.Schema({
    clientDesc:{
        type :String,
        default :""
    },
    stuffDesc:{
        type :String,
        default :""
    },
    clientName:String,
    stuffName:String,
    clientId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    stuffId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    ticketId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ticket'
    },
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
module.exports=mongoose.model('complain',complainSchema)