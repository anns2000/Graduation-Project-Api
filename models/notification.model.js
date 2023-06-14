

const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    Data:String,
    state : String,
    type:String,
    isSeen:{
      type: Boolean,
      default:false
    },
    userId: {
      //user who get this ticket
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { 
    timestamps:true,
    toJSON: {
      transform: function (doc, ret) {
        (ret.id = ret._id.toString()), delete ret._id;
        delete ret.__v;
      },
    },
  }
);
module.exports = mongoose.model('notification', notificationSchema);
