const { number } = require('joi');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    photo: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/chatapp-65d64.appspot.com/o/Group%201250.png?alt=media&token=6d6d947d-b1f2-4697-8d80-8e1b907ca52f'
    },
    role: String,
    fcmToken: String,
    // add count rate and sum rate
    countRate:{
        type: Number,
        default : 0
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    onTicket: {
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
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
            delete ret.__v;
        }
    }
},)
module.exports = mongoose.model('user', userSchema)