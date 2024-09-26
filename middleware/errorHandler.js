const {constants} = require("../constants");

const errorHandler = (err, req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message: err.message, stack: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message: err.message, stack: err.stack});
            break;
        case constants.UNATHORIZED:
            res.json({title:"unauthorized",message: err.message, stack: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"forbidden",message: err.message, stack: err.stack});
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({title:"Internal Server Error",message: err.message, stack: err.stack});
            break;
        default:
            console.log("No Error, All good");
            break;
    }
}


module.exports = errorHandler