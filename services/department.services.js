
const departmentModel=require('../models/department.model');


module.exports.addDepartment=async(req,res)=>{

    const{name}=req.body;

    const add=await departmentModel.findOne({name});

    if(add)
    {
        res.status(404).json({
            meg:"this department already exists",
            isError:true,
            data:null
          });
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

module.exports.getAll=async(req,res)=>{

const department=await departmentModel.find()

if(department.length==0)
{
    res.status(404).json({
        meg:"there is no department ",
        isError:true,
        data:null
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
module.exports.deleteDepartment=async(req,res)=>{

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
        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:null
          });    }
    else
    {
        res.status(404).json({
            meg:"this department does not exists ",
            isError:true,
            data:null
          });
    }
}