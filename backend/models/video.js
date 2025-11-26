import { model, Schema } from "mongoose";


const videoSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    thumbnail :{
        type : String,

    },
    url : {
        type : String,
        required : true
    }

})

const Video = model("Videos", videoSchema)
export default Video