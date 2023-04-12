
const userModel=require('../models/user.model');
const createError = require('http-errors');
const createError = require('cloudinary');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
cloudinary.config({
    cloud_name: "donwkw0ny",
    api_key: "948569869913115",
    api_secret: "YVQgJVnpcyBd0z2_OT_1RN2t7uI"
  });


module.exports.addUser=async(req,res,next)=>{
    try {
        const{username,password,role,name,department}=req.body;
        const add=await userModel.findOne({username})
         if(add)
         {
             return next(createError(201,'this user already exists'))
         }
         else
         {
             bcrypt.hash(password, 4,async function(err, hash) {
     
                 await userModel.insertMany({name,password:hash,role,username,department});
                 user= await userModel.findOne({username});
                 res.status(201).json({
                   meg:"added successfully",
                   isError:false,
                   data:user
                 });
             });
             
     
         
     }
        
    } catch (error) {
        return next(createError(405,'server maintenance underway please try again later'))


    }
 
}
module.exports.getAll=async(req,res,next)=>{
    try {
        const users=await userModel.find();

        if(users.length==0)
        {
            return next(createError(201,'there is no user in your system'))
    
        }
        else
        {
            res.status(202).json({
                meg:"success",
                isError:false,
                data:users
              });
        }
    
        
    } catch (error) {
        return next(createError(405,'there is no user in your system'))

    }

}
module.exports.getAllClient=async(req,res,next)=>{

    const users=await userModel.find({role:"client"});

    if(users.length==0)
    {
        return next(createError(207,'there is no client in your system'))

    }
    else
    {
        res.status(202).json({
            meg:"success",
            isError:false,
            data:users
          });
    }

}
module.exports.getAllStaff=async(req,res,next)=>{

    const users=await userModel.find({role:"stuff"});

    if(users.length==0)
    {
        return next(createError(404,'there is no stuff in your system'))

    }
    else
    {
        res.status(202).json({
            meg:"success",
            isError:false,
            data:users
          });
    }

}
module.exports.deleteUser=async(req,res,next)=>{

    const{id}=req.body;
    console.log(id)
    if(id.length<12)
    {
        while(id.length<12)
            {
                id+="0";
            }
    }


    const dele=await userModel.findById(id);
    if(dele)
    {
        await userModel.findByIdAndRemove(id);
        res.status(202).json({
            meg:"deleted",
            isError:false,
            data:[]
          
        });    
    }
    else
    {
        return next(createError(404,'this user does not exists'))

    }    
   
}
module.exports.updateUser=async(req,res,next)=>{

    const{id,username,password,role,rate,
        department,totalTickets,rejectedTickets,name}=req.body
      
        if(id.length<12)
        {
            while(id.length<12)
                {
                    id+="0";
                }
        }
        const user=await userModel.findById(id);
        if(user)
        {
            if(req.file)
            {
             await cloudinary.v2.uploader.upload(req.file.path,async(error,out)=>{
          
               req.body.photo=out.secure_url;
           })
            }
          
           user=await userModel.findByIdAndUpdate(id,{username,password,role,rate,department,totalTickets,rejectedTickets,name,photo:req.body.photo});
            res.status(201).json({
                 meg:"success",
                  isError:false,
                 data:user
            })
        }
        else
        {
            return next(createError(201,'this user not found'))

        }

}
module.exports.signin=async(req,res,next)=>{
    const {username,password}=req.body
    const user=await userModel.findOne({username})
    if(!user)
    {
        return next(createError(201,'user not found'))
    }
    else
    {
        bcrypt.compare(password, user.password, async function(err, result) {
          
            
            if(result)
            {
                var token = jwt.sign({ id:user._id,name:user.name,email:user.email,role:user.role }, 'anas');
                res.status(202).json({
                    meg:"success",
                     isError:false,
                     token:token,
                    data:user
               })
            }
            else
            {
               return next(createError(201,'wrong user or password'))

            }
        });                
    }
}
