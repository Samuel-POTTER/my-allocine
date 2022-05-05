import { AddMovieToPlaylistController, createPlaylistController, getAllPlaylistController, getGenreMovieController, getLikedMovieController, GetPlaylistByIdController, getWatchedMovieController, sendGenreMovieController, sendLikedMovieController, SendWatchedMovieController } from "../controller/movie.controller";
import { Router } from "express";
import { hasJWT } from "../middleware/has_jwt";

const router = Router();

router.get('/genre', hasJWT, getGenreMovieController);
router.get('/like', hasJWT, getLikedMovieController);
router.get('/playlist', hasJWT, getAllPlaylistController);
router.get('/playlistId/:id', hasJWT, GetPlaylistByIdController);
router.get('/watch', hasJWT, getWatchedMovieController);


router.post('/genre', hasJWT, sendGenreMovieController);
router.post('/like', hasJWT, sendLikedMovieController);
router.post('/playlist', hasJWT, createPlaylistController);
router.post('/watch', hasJWT, SendWatchedMovieController);

router.patch('/playlist', hasJWT, AddMovieToPlaylistController);

export default router;