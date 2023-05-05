const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    photo: String,
    role: String,
    // add count rate and sum rate
    isOnline:{
        type: Boolean,
        default: false
    },
    onTicket:{
        type: Boolean,
        default: false
    },
    rate: {
        type: Number,
        default: 0
    },
    department: {
        type: String,
        ref: "department"
    },
    totalTickets: {
        type: Number,
       default: 0
    },
    rejectedTickets: {
        type: Number,
        default: 0
    },
    name: String,
}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
            delete ret.__v;
        }
    }
}, )
module.exports = mongoose.model('user', userSchema)