
const userModel = require('../models/user.model');
const createError = require('http-errors');
const cloudinary = require('cloudinary');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const complainsModel = require('../models/complains.model');
const ticketsModel = require('../models/tickets.model');
const notificationModel = require('../models/notification.model');
const { pushNotificationsBytoken } = require('./notification.services');
cloudinary.config({
    cloud_name: "donwkw0ny",
    api_key: "948569869913115",
    api_secret: "YVQgJVnpcyBd0z2_OT_1RN2t7uI"
});

module.exports.addUser = async (req, res, next) => {
    try {
        const { username, password, role, name, department, phone, fcmToken } = req.body;
        const add = await userModel.findOne({ username })
        if (add) {
            return next(createError(201, 'this user already exists'))
        }
        else {
            bcrypt.hash(password, 4, async function (err, hash) {
                await userModel.insertMany({ name, password: hash, role, username, department, phone });
                user = await userModel.findOne({ username });
                res.status(201).json({
                    meg: "added successfully",
                    isError: false,
                    data: user
                });
            });



        }

    } catch (error) {
        console.log(error.message);
        return next(createError(405, 'server maintenance now please try again later'))


    }

}
module.exports.getAll = async (req, res, next) => {
    try {
        const users = await userModel.find();



        res.status(202).json({
            meg: "success",
            isError: false,
            data: users ?? []
        });



    } catch (error) {
        console.log(error.message);

        return next(createError(405, 'server maintenance now please try again later'))

    }

}
module.exports.getbyId = async (req, res, next) => {
    try {
        const { id } = req.body;
        const users = await userModel.find({ _id: id });

        if (users.length == 0) {
            return next(createError(207, 'There is no User in Your System'))
        }
        else {
            res.status(202).json({
                meg: "success",
                isError: false,
                data: users[0]
            });
        }


    } catch (error) {
        console.log(error.message);
        return next(createError(405, 'server maintenance now please try again later'))
    }
}
module.exports.getAllClient = async (req, res, next) => {

    try {
        const users = await userModel.find({ role: "client" });



        res.status(202).json({
            meg: "success",
            isError: false,
            data: users ?? []
        });

    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }


}
module.exports.getAllStaff = async (req, res, next) => {

    try {
        const users = await userModel.find({ role: "stuff" });
        res.status(202).json({
            meg: "success",
            isError: false,
            data: users ?? []
        });
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }



}
module.exports.deleteUser = async (req, res, next) => {

    try {

        const dele = await userModel.findById(id);
        if (dele) {
            await userModel.findByIdAndRemove(id);
            res.status(202).json({
                meg: "deleted",
                isError: false,
                data: []

            });
        }
        else {
            return next(createError(201, 'this user does not exists'))

        }
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }




}
module.exports.updateUser = async (req, res, next) => {

    try {
        const { oldPassword,
            newPassword, name, phone, photo } = req.body
        const user = await userModel.findOne({ _id: req.userId });
        if (oldPassword) {
            bcrypt.compare(oldPassword, user.password, async function (err, result) {

                if (result) {

                    bcrypt.hash(newPassword, 4, async function (err, hash) {

                        await userModel.findOneAndUpdate({ _id: user.id }, { password: hash, name: name, phone: phone, photo: photo })
                        const ret = await userModel.findOne({ _id: user.id })
                        res.status(201).json({
                            meg: "updated successfully",
                            isError: false,
                            data: ret
                        });
                    });
                }
                else {
                    return next(createError(201, 'wrong password'))

                }
            });
        } else {
            await userModel.findOneAndUpdate({ _id: user.id }, { name: name, phone: phone, photo: photo })
            const ret = await userModel.findOne({ _id: user.id });
            res.status(201).json({
                meg: "updated successfully",
                isError: false,
                data: ret
            });
        }

    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }








}
module.exports.signin = async (req, res, next) => {

    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username })
        if (!user) {
            return next(createError(201, 'user not found'))
        }
        else {
            bcrypt.compare(password, user.password, async function (err, result) {


                if (result) {
                    var token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, 'anas');
                    res.status(202).json({
                        meg: "success",
                        isError: false,
                        token: token,
                        data: user
                    })
                }
                else {
                    return next(createError(201, 'wrong user or password'))

                }
            });
        }
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }

}

module.exports.addrating = async (req, res, next) => {

    try {
        const { rate, complainDes, ticketId } = req.body;
        console.log(rate);
      const  userId = req.userId
      const  userName = req.userName

        let user = await userModel.findOne({ _id: userId });
        console.log(user);
        let newRate = user.rate + rate;
        let newCount = user.countRate + 1;
        await userModel.findOneAndUpdate({ _id: userId }, { rate: newRate, countRate: newCount });
        user = await userModel.findOne({ _id: userId });
        const myTicket = await ticketsModel.findOne({ _id: ticketId });
        const stuff = await userModel.findOne({ _id: myTicket.workBy })

        if (complainDes.length > 1) {

            const user = await userModel.find({ role: "admin" })
            for (let i = 0; i < user.length; i++) {
                await notificationModel.insertMany({ title: "new complain", desc: "You Have New complain", userId: user[i]._id, type: "newComplain", state: "normal", Data: "" });
                if (user[i].fcmToken) {
                    console.log(user[i].fcmToken);

                    const data = await pushNotificationsBytoken(user[i].fcmToken, "new Complain", "You Have New Complain", "")
                }
            }

            const complain = await complainsModel.findOne({ ticketId: ticketId });
            if (complain) {
                await complainsModel.findOneAndUpdate({ ticketId: ticketId }, { clientId: userId, stuffId: stuff._id, stuffName: stuff.name, clientName: userName, clientDesc: complainDes });
                const com1 = await complainsModel.findOne({ ticketId: ticketId });
                //console.log(2,com1)
            }
            else {
                const com2 = await complainsModel.insertMany({ clientId: userId, stuffId: stuff._id, stuffName: stuff.name, clientName: userName, clientDesc: complainDes });
                //console.log(1,com2)
            }
        }


        res.status(202).json({
            meg: "success",
            isError: false,
            data: user
        })
    } catch (error) {
        console.log(error.message);
        return next(createError(405, 'server maintenance now please try again later'))

    }

}

module.exports.getUserRating = async (req, res, next) => {

    try {
        const { userId } = req.header;
        const userRating = await userModel.findById({ userId }, { countRate });

        res.status(202).json({
            meg: "your rating",
            isError: false,
            data: userRating
        })
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'));

    }

}
