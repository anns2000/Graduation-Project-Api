const questionsModel = require("../models/questions.model")
const createError = require('http-errors');
const { pushNotificationsBytoken } = require('./notification.services');
const Agora = require("agora-access-token");
const userModel = require("../models/user.model");
const notificationModel = require("../models/notification.model");


module.exports.addQuestion = async (req, res, next) => {

    const { question, answer } = req.body

    await questionsModel.insertMany({ question, answer });
    const questions = await questionsModel.find();
    res.status(201).json({
        meg: "added successfully",
        isError: false,
        data: questions
    });
}

module.exports.getAll = async (req, res, next) => {


    const questions = await questionsModel.find();



    res.status(201).json({
        meg: "success",
        isError: false,
        data: questions ?? []
    });


}

module.exports.deleteOne = async (req, res, next) => {

    const { id } = req.body;
    if (id.length < 12) {
        while (id.length < 12) {
            id += "0";
        }
    }


    const dele = await questionsModel.findById(id);
    if (dele) {
        await questionsModel.findByIdAndRemove(id);
        const quest = await questionsModel.find();

        res.status(201).json({
            meg: "deleted",
            isError: false,
            data: quest
        });
    }
    else {
        return next(createError(201, "this question does not exists"));
    }
}
module.exports.agora= async(req,res,next)=>{
    const appID = "c3e8e71cae794f4eb01046f29e2e84e9";
    const appCertificate = "101f2ad714e742ebbf1303cf7bb032f1";
    const expirationTimeInSeconds = 3600;
    const uid = Math.floor(Math.random() * 100000);
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const {userId} = req.body
    const myId=req.userId

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
   
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    
    const user= await userModel.findOne({_id:userId});
    const me= await userModel.findOne({_id:myId});

    await notificationModel.insertMany({ title: "video Call", desc: `${me.name} waiting you in vedio call room`, userId: user._id,type:"videoCall",state:"normal",Data:(me._id).toString()});

    if(user.fcmToken)
    {

        await pushNotificationsBytoken(user.fcmToken,"video Call",`${me.name} waiting you in vedio call room`,me._id);

    }
    
    res.status(201).json({
      meg: "sucsses",
      isError: false,
      data: { uid, token }
    });

}


