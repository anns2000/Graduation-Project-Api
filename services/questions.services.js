const questionsModel = require("../models/questions.model")
const createError = require('http-errors');


module.exports.addQuestion=async(req,res,next)=>{

const {question , answer}= req.body

    await questionsModel.insertMany({question,answer});
    
    questions= await questionsModel.find();
    res.status(201).json({
      meg:"added successfully",
      isError:false,
      data:questions
    });
}

module.exports.getAll=async(req,res,next)=>{

  
     const questions= await questionsModel.find();

     if(questions)
     {
         res.status(201).json({
           meg:"success",
           isError:false,
           data:questions
         });
     }
     else
     {
        return next(createError(404,"there is no questions at all"));
     }
    }
    
    module.exports.deleteOne=async(req,res,next)=>{

        const{id}=req.body;
        if(id.length<12)
        {
            while(id.length<12)
                {
                    id+="0";
                }
        }
    
    
        const dele=await questionsModel.findById(id);
        if(dele)
        {
            await questionsModel.findByIdAndRemove(id);
            const quest= await questionsModel.find();

            res.status(201).json({
                meg:"deleted",
                isError:false,
                data:quest
              });    }
        else
        {
            return next(createError(404,"this question does not exists"));
        }
    }


