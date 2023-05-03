const momgoose = require('mongoose')

const timeTableSchema = momgoose.Schema({

        name: String,
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
    //ana mario yalaaaaaaaaa AFK ANAS


module.exports = momgoose.model('timetable', timeTableSchema)