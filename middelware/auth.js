
var jwt = require('jsonwebtoken');
const createError = require('http-errors');



module.exports.auth=async(req,res,next)=>{
    
    const token=req.header('token')
    jwt.verify(token, 'anas', async function(err, decoded) {
            if(err)
            {
               return next(createError(404,'wrong token'))

            }
            else
            {
                    if(decoded.role==='admin')
                    {
                            next();
                    }
                    else
                    {
                           return next(createError(404,"you cant do that"));

                    }

            }

            });
      

}
