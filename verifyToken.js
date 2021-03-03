const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token){
        res.send("No token found in header");
    }
    else{
        try {
            jwt.verify(token,"vision");
            next();
        } catch (error) {
            res.send("Invalid token");
        }
    }
}
