const handleCastErrorDB =err=>{
    return new AppeError(`Invalid ${err.path} : ${err.value}`,400)
}
const handelJWTError= err =>{
    return new AppeError('Invalid Token',401)
}
const TokenExpireError=err=>{
    return new AppeError('Time has Expired',401)
}


module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;  //500-Internal sever error
    err.status = err.status || 'error'

    if(process.env.NODE_ENV==='development'){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            stack:err.stack
        })
    }else{
        let error={...err}
        if(error.name==='CastError'){
            error = handleCastErrorDB(error)
        }
        if(error.name==='JsonWebTokenError') error = handelJWTError(error)
        if(error.name==='TokenExpiredError') error = TokenExpireError(error)      
        if(error.isOperational){                 // Operationa error- errors happen due to wrong querie/ not a mistake of a programmer
            res.status(error.statusCode).json({
                status:error.status,
                message:error.message
            })
        }else{
            res.status(500).json({   //Error happen due to programmers mistakes / non intential
                status:'error',
                message:'Something went wrong...'
            })
        }
    }
}