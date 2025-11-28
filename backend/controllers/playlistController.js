import Kid from "../models/kid.js"
import Playlist from "../models/playlist.js"
import Videos from '../models/video.js'

export const createPlaylist = async(req, res)=>{

    try {
        const kidId = req.user.id
        const {name} = req.body
    
        const playlist = new Playlist({
            name : name || 'my-playlist',
            kid : kidId,
            videos : []
        })

        await playlist.save()
    
        await Kid.findByIdAndUpdate(
            kidId,
            {
                $push : { playlists : playlist._id }
            }
        )

        res.status(201).json({
            success : true,
            message : "new playlist created",
            playlist
        })
        
    } catch (error) {
        const err = new Error(error.message)
        err.statuCode = 500
        throw err
    }
}


export const getPlaylists = async(req, res) => {

    try {
        const kidId = req.user.id 
    
        const newKid = await Kid.findById(kidId)
            .populate({
                path : 'playlists',
                populate : {
                    path : 'videos',
                    model  : 'Videos'
                }
            })
    
        if(!newKid){
            const err = new Error('kid not found')
            err.statuCode = 404
            throw err
        }
    
        res.status(200).json({
            message : 'all playlists',
            playlists : newKid.playlists
        })
        
    } catch (error) {
        const err = new Error(error.message)
        err.statuCode = 500
        throw err
    }
    
    

}


export const deletePlaylist = async(req, res) => {
    
    try {
        const kidId = req.user.id 
        const {playlistId} = req.params

        console.log(kidId,"kid ", playlistId)
        const playlist = await Playlist.findOne({
            _id : playlistId,
            kid : kidId
        })

        if (!playlist) {
        const err = new Error("Playlist not found or unauthorized");
        err.statusCode = 404;
        throw err
        }


        await Playlist.findByIdAndDelete(playlistId)


        await Kid.findByIdAndUpdate(
            kidId,
            {
                $pull : { playlists : playlistId}
            }
        )
        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully"
        });

    } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 500;
        throw err
    }
}


export const addToPlaylist = async(req, res)=>{

    try {
        const {playlistId, videoId} = req.body

        const playlist = await Playlist.findById(playlistId)

        if(!playlist){
            const err = new Error('playlist not found ')
            err.statusCode = 404
            throw err
        }

        const existAlready = await playlist.videos.includes(videoId)
        if(existAlready){
            const err = new Error(' already exist in playlist')
            err.statusCode = 401
            throw err
        }

        await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $push : {videos : videoId}
            }
        )


        res.status(200).json({
            message : 'video add to playlist successfully'
        })



    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 500
        throw err
    }

}