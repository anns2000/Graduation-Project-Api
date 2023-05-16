
const userModel = require('../models/user.model');
const createError = require('http-errors');
const cloudinary = require('cloudinary');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const complainsModel = require('../models/complains.model');
cloudinary.config({
    cloud_name: "donwkw0ny",
    api_key: "948569869913115",
    api_secret: "YVQgJVnpcyBd0z2_OT_1RN2t7uI"
});

module.exports.addUser = async (req, res, next) => {
    try {
        const { username, password, role, name, department, phone } = req.body;
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

        if (users.length == 0) {
            return next(createError(201, 'there is no user in your system'))

        }
        else {
            res.status(202).json({
                meg: "success",
                isError: false,
                data: users
            });
        }


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

    const users = await userModel.find({ role: "client" });

    if (users.length == 0) {
        return next(createError(207, 'there is no client in your system'))

    }
    else {
        res.status(202).json({
            meg: "success",
            isError: false,
            data: users
        });
    }

}
module.exports.getAllStaff = async (req, res, next) => {

    const users = await userModel.find({ role: "stuff" });

    if (users.length == 0) {
        return next(createError(201, 'there is no stuff in your system'))

    }
    else {
        res.status(202).json({
            meg: "success",
            isError: false,
            data: users
        });
    }

}
module.exports.deleteUser = async (req, res, next) => {

    const { id } = req.body;
    //console.log(id)
    if (id.length < 12) {
        while (id.length < 12) {
            id += "0";
        }
    }


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

}
module.exports.updateUser = async (req, res, next) => {
    
    const {  oldPassword,
        newPassword,name, phone ,photo } = req.body

        const user = await userModel.findOne({ _id:req.userId });
        bcrypt.compare(oldPassword, user.password, async function (err, result) {

            if (result) {

                bcrypt.hash(newPassword, 4, async function (err, hash) {
                   
                   await userModel.findOneAndUpdate({_id:user.id},{password:hash,name:name,phone:phone,photo:photo})
                   const ret=await userModel.findOne({_id:user.id})
                  // console.log(ret)
                  // console.log(ret.photo)


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
        
       
      
    


    

}
module.exports.signin = async (req, res, next) => {
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
}

module.exports.addrating = async (req, res, next) => {

    const{rate ,complainDes , ticketId} = req.body;
    userId = req.userId
    userName= req.userName
    

    let user=await userModel.findOne({_id:userId});
    console.log(user);
    let newRate=user.rate+rate;
    let newCount=user.countRate+1;
    console.log(newCount,newRate);
    await userModel.findOneAndUpdate({_id:userId},{rate:newRate,countRate:newCount});
     user=await userModel.findOne({_id:userId});
    
      if(complainDes.length>1)
      {
          const complain=await complainsModel.findOne({ticketId:ticketId});
          if(complain)
          {
             await complainsModel.findOneAndUpdate({ticketId:ticketId},{clientId:userId,clientName:userName,clientDesc:complainDes});
             const com1=await complainsModel.findOne({ticketId:ticketId});
                //console.log(com1);
            }
          else
          {
            const com2 =await complainsModel.insertMany({clientId:userId,clientName:userName,clientDesc:complainDes});
          //  console.log(com2);
        }
      }

  
    res.status(202).json({
        meg: "success",
        isError: false,
        data: user
    })
}

module.exports.getUserRating = async(req,res,next)=>{
    const{userId} = req.header;
    const userRating = await userModel.findById({userId},{countRate});
    
    res.status(202).json({
        meg: "your rating",
        isError: false,
        data: userRating
    })
}
