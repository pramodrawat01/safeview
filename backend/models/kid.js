import { model, Schema } from "mongoose";

const allowedCategories = [
    "Sports",
    "Gaming",
    "News",
    "Comedy",
    "Music",
    "Podcast",
    "Documentary",
    "Education",
]

const kidSchema =  new Schema({
    userName : {
        type : String,
        required : [true, "please select a username "],
        unique : true,

    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    parentId : {
        type : Schema.Types.ObjectId,
        ref : "Parent",
        required : true
    },
    role: {
        type: String,
        enum: ["kid"],
        default: "kid",
    },

    allowedCategories : {
        type : [String],
        enum : {
            values : allowedCategories,
            message : "invalid category"
        }, 
        default : allowedCategories
    },
    playlists : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Playlist'
        }
    ]
},  
{
    timestamps : true
})

const Kid = model("Kid", kidSchema)
export default Kid