
var jwt = require('jsonwebtoken');
const createError = require('http-errors');



module.exports.auth = async (req, res, next) => {
        const token = req.header('token');
        jwt.verify(token, 'anas', async function (err, decoded) {
                if (err) {
                        console.log(err.message)
                        return next(createError(201, 'Wrong Token'))
                }
                else {
                        req.userId = decoded.id;
                        req.userName=decoded.name;
                        next();
                }

        });

}
