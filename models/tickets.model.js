///Auther Mario Ktkt 


const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    status:{
      type : String,
      default: "in Queue"
    },
    ticketTime:Date,
    inProgress: {
      type: Boolean,
      default: false
    },
    createdBy: {
      //clint who submit ticket
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    workBy: {
      //IT who work at this ticket
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    building: {
      //IT who work at this ticket
      type: mongoose.SchemaTypes.ObjectId,
      ref: "building",
    },
  },
  { 
    timestamps:true,
    toJSON: {
      transform: function (doc, ret) {
        (ret.id = ret._id.toString()),
        delete ret._id;
        delete ret.__v;
      },
    },
  }
)
module.exports = mongoose.model('ticket', ticketSchema);
