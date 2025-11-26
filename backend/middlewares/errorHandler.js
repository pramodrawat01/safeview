export const errorHandler = async(err, req, res, next)=>{
    console.log("Error : ",err.message)
    const status = err.statusCode || 500

    return res.status(status).json({
        success : false,
        message : err.message || "Internal server error"
    })
}   