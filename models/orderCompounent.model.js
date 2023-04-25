///Auther Mario Ktkt 

const mongoose = require('mongoose')

const orderCompounent = mongoose.schema({
compounent : String,
ticketId: String,
isSend: Boolean
},{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
                delete ret.__v;
        }
    }
})

module.exports = mongoose.model ('compounent',orderCompounent)