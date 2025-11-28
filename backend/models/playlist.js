import { model, Schema } from "mongoose";

const playlistSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    kid : {
        type : Schema.Types.ObjectId,
        ref : 'Kid'
    },
    videos : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Videos'
        }
    ]
}, {
    timestamps : true
})

const Playlist = model('Playlist', playlistSchema)
export default Playlist