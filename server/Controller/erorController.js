module.exports = (err,req,res,next)=>{
    console.error("GLOBAL ERROR:", err)  //check the  validation
    err.statuscosde = err.statusCode || 500;
    err.status = err.status || 'error';


    res.status(err.statuscosde).json({
        status: err.status,
        error:err,
        message: err.message,
        stack: err.stack
    });     
}
