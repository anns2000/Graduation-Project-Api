const Joi = require('joi');
const createError = require('http-errors');

const vaildationSchema = Joi.object({

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email(),
    role:Joi.string().required().equal('admin','user'),
    age:Joi.number()
})

module.exports.uservalidation=(req,res,next)=>{
    const{error}=vaildationSchema.validate(req.body,{abortEarly:false})
    if(error)
    {
        errorArray=[];
        error.details.map((msg)=>{

            errorArray.push(msg.message);
        })
        res.json(errorArray);
    }
    else
    {
        next()
    }

}