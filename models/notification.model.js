

const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    Data:String,
    state : String,  // enum NotificationState { warning, normal, danger, safe } 
    type:String,     //enum NotificationType { videoCall, accepted , closed,  newTicket ,firstChat , newOrder ,orderResult , newComplan }
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
