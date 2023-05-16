const { boolean } = require('joi');
const momgoose = require('mongoose')

const timeTableSchema = momgoose.Schema({

        name: String,
        isActive:{
            type:Boolean,
            default : false,
        },
        priorityList: [{
            departmentName: String,
            departmentId: String
        }]
    }, {
        toJSON: {
            transform: function(doc, ret) {
                ret.id = ret._id.toString(),
                delete ret._id;
                delete ret.__v;
            }
        }
    })


module.exports = momgoose.model('timetable', timeTableSchema)