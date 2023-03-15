
const userModel=require('../models/user.model');


module.exports.addUser=async(req,res)=>{

    const{username,password,role,name,department}=req.body;
    add=await userModel.findOne({username})
    
    if(add)
    {
        res.status(404).json({
            meg:"this user already exists ",
            isError:true,
            data:null
          });
    }
    else
    {
        await userModel.insertMany({name,password,role,username,department});
          user= await userModel.findOne({username});
          res.status(201).json({
            meg:"added successfully",
            isError:false,
            data:user
          });

    
}
}
module.exports.getAll=async(req,res)=>{

    const users=await userModel.find();

    if(users.length==0)
    {
        res.status(404).json({
            meg:"there is no user in your system",
            isError:true,
            data:null
          });
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
module.exports.getAllClient=async(req,res)=>{

    const users=await userModel.find({role:"Client"});

    if(users.length==0)
    {
        res.status(404).json({
            meg:"there is no Client in your system",
            isError:true,
            data:null
          });
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
module.exports.getAllStaff=async(req,res)=>{

    const users=await userModel.find({role:"Staff"});

    if(users.length==0)
    {
        res.status(404).json({
            meg:"there is no Staff in your system",
            isError:true,
            data:null
          });
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
module.exports.deleteUser=async(req,res)=>{

    const{id}=req.body;
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
        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:null
          
        });    
    }
    else
    {
        res.status(404).json({
            meg:"this user does not exists ",
            isError:true,
            data:null
          });
    }    
   
}
module.exports.updateUser=async(req,res)=>{

    const{id,username,password,role,rate,
        department,totalTickets,rejectedTickets,name}=req.body

}