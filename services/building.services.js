
const buildingModel=require('../models/building.model');


module.exports.addBuilding=async(req,res,next)=>{

    const{name}=req.body;

    const add=await buildingModel.findOne({name});

    if(add)
    {
        return next(createError(201,"this building already exists"));
    }
    else
    {
        await buildingModel.insertMany({name});
          building= await buildingModel.findOne({name});
          res.status(201).json({
            meg:"added successfully",
            isError:false,
            data:building
          });

    }
}

module.exports.getAll=async(req,res,next)=>{

const building=await buildingModel.find()
console.log(building);
if(building.length==0)
{

    return next(createError(201,"there is no building at all"));
}
else
{

    res.status(201).json({
        meg:"sucsess",
        isError:false,
        data:building
      });

}


}
module.exports.deleteBuilding=async(req,res,next)=>{

    let{id}=req.body;
    if(id.length<12)
    {
        while(id.length<12)
            {
                id+="0";
            }
    }
    const dele=await buildingModel.findById(id);
    if(dele)
    {
        await buildingModel.findByIdAndRemove(id);
        const builds= await buildingModel.find();

        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:builds
          });    }
    else
    {
        return next(createError(201,"this building does not exists"));
    }
}