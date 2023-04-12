
const departmentModel=require('../models/department.model');
const createError = require('http-errors');


module.exports.addDepartment=async(req,res,next)=>{

    const{name}=req.body;

    const add=await departmentModel.findOne({name});

    if(add)
    {
        return next(createError(404,"this department aready exisit"));
    }
    else
    {
        await departmentModel.insertMany({name});
          department= await departmentModel.findOne({name});
          res.status(201).json({
            meg:"added successfully",
            isError:false,
            data:department
          });

    }
}

module.exports.getAll=async(req,res,next)=>{

const department=await departmentModel.find()

if(department.length==0)
{
    res.status(404).json({
        meg:"there is no department ",
        isError:true,
        data:[]
      });

}
else
{

    res.status(201).json({
        meg:"sucsess",
        isError:false,
        data:department
      });

}


}
module.exports.deleteDepartment=async(req,res,next)=>{

    const{id}=req.body;
    if(id.length<12)
    {
        while(id.length<12)
            {
                id+="0";
            }
    }


    const dele=await departmentModel.findById(id);
    if(dele)
    {
        await departmentModel.findByIdAndRemove(id);
        const departs= await departmentModel.find();

        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:departs
          });    }
    else
    {

        return next(createError(404,"this department does not exists"));
    }
}