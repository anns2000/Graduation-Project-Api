
const mongoose = require('mongoose')

const orderCompounent = mongoose.Schema({
    compounent: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    isSend: {
        type: Boolean,
        default: false
    }
}, {
    timestamps:true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString(),
                delete ret._id;
            delete ret.__v;
        }
    }
})

module.exports = mongoose.model('compounent', orderCompounent)