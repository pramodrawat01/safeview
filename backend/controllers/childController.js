import { Types } from "mongoose"
import Kid from "../models/kid.js"


export const getAccessedVideos = async(req, res)=>{
    
    try {
        const kidId = req.user.id

        const result = await Kid.aggregate([
            {
                // mongo db aggrigate always required id in ObjectId not sting 
                $match : {_id : new Types.ObjectId(kidId)  }
            },
            {
                // interect with another collection in db 
                $lookup : {
                    from : 'videos',
                    localField : 'allowedCategories',
                    foreignField : 'category',
                    as : 'allowedVideos'
                }
            },
            {
                $project : {
                    userName : 1,
                    allowedCategories : 1,
                    allowedVideos : 1
                }
            }
        ])

        if(!result.length){
            const err = new Error('kid not found ')
            err.statusCode = 404
            throw err
        }

        // console.log(result)
        res.status(200).json({
            success : true,
            kid : result[0],
            videos : result[0].allowedVideos
        })
        
    } catch (error) {
            const err = new Error(error.message)
            err.statusCode = 400
            throw err
    }
    
}