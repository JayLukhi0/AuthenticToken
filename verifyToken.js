const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('Authorization');
    if(!token){
        res.send("No token found in header");
    }
    else{
        try {
            // console.log(token.split(' ')[1]);
            jwt.verify(token.split(' ')[1],process.env.SECRET_KEY);
            next();
        } catch (error) {
            console.log(error);
            err_msg="Invalid token";
            res.send({err_msg});
        }
    }
}
