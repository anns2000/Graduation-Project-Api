
const buildingModel=require('../models/building.model');


module.exports.addBuilding=async(req,res)=>{

    const{name}=req.body;

    const add=await buildingModel.findOne({name});

    if(add)
    {
        res.status(404).json({
            meg:"this building already exists ",
            isError:true,
            data:null
          });
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

module.exports.getAll=async(req,res)=>{

const building=await buildingModel.find()
console.log(building);
if(building.length==0)
{
    res.status(404).json({
        meg:"there is no building at all",
        isError:true,
        data:null
      });

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
module.exports.deleteBuilding=async(req,res)=>{

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
        res.status(201).json({
            meg:"deleted",
            isError:false,
            data:null
          });    }
    else
    {
        res.status(404).json({
            meg:"this building does not exists ",
            isError:true,
            data:null
          });
    }
}