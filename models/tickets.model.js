const momgoose = require("mongoose");
const ticket = momgoose.Schema(
  {
    title: String,
    desc: String,
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
     //Date and Time when submit this Tickit
    dateAndTime: {
      type: Date,
      default: Date.now,
    },
    building:String,
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
module.exports = mongoose.model("ticket", ticket);
