import Router from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addToPlaylist, createPlaylist, deletePlaylist, getPlaylists } from '../controllers/playlistController.js'

const playlistRoutes = Router()

playlistRoutes.post('/create_playlist', authMiddleware , createPlaylist )

playlistRoutes.get('/get_playlists', authMiddleware, getPlaylists )
playlistRoutes.delete('/delete_playlist/:playlistId', authMiddleware, deletePlaylist )

playlistRoutes.post('/add_to_playlist', authMiddleware, addToPlaylist)

export default playlistRoutes