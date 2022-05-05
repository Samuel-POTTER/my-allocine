import { AddMovieToPlaylistAction, AddWatchedMovieAction, createPlaylistAction, GetAllPlaylistAction, getGenreMovieAction, getLikedMovieAction, GetPlaylistByIdAction, GetWatchedMovieAction, sendGenreMovieAction, sendLikedMovieAction } from "../action/movie.action";
import { getCurrentUser } from "../utils/get_current_user";
import {addMovieToPlaylistData, createPlaylistData, getPlaylistByIdData, sendGenreMovieData, sendLikedMovieData} from '../dataTransfertObject/movie.data';
import { Request, Response } from 'express';

export const getGenreMovieController = async(req: Request, res: Response) => {
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await getGenreMovieAction(user.user_id);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const sendGenreMovieController = async(req: Request, res: Response) => {
    const payload = await sendGenreMovieData(req, res);
    if (!payload) return;
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }
    const genres = await sendGenreMovieAction(user.user_id, payload.id, payload.genre_name);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const getLikedMovieController = async(req: Request, res: Response) => {
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await getLikedMovieAction(user.user_id);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const sendLikedMovieController = async(req: Request, res: Response) => {
    const payload = await sendLikedMovieData(req, res);
    if (!payload) return;
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }
    const genres = await sendLikedMovieAction(user.user_id, payload);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const createPlaylistController = async(req: Request, res: Response) => {
    const payload = await createPlaylistData(req, res);
    if (!payload) return;
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await createPlaylistAction(user.user_id, payload.playlist_name);
    if (!genres.success) {        
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const AddMovieToPlaylistController = async(req: Request, res: Response) => {
    const payload = await addMovieToPlaylistData(req, res);
    if (!payload) return;
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await AddMovieToPlaylistAction(payload.playlist_id, payload.movie);
    if (!genres.success) {        
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const getAllPlaylistController = async(req: Request, res: Response) => {
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await GetAllPlaylistAction(user.user_id);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const GetPlaylistByIdController = async(req: Request, res: Response) => {
    // const payload = await getPlaylistByIdData(req, res);
    // if (!payload) return;
    const payload = req.params.id as string
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await GetPlaylistByIdAction(payload);
    if (!genres.success) {        
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const SendWatchedMovieController = async(req: Request, res: Response) => {
    const payload = await sendLikedMovieData(req, res);
    if (!payload) return;
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }
    const genres = await AddWatchedMovieAction(user.user_id, payload);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};

export const getWatchedMovieController = async(req: Request, res: Response) => {
    const user = getCurrentUser(req);

    if (!user) {
        res.status(401).send({ message: 'ko', error: 'Unauthorized', tag: 'VERIFY_CURRENT_USER' });
        return;
    }

    const genres = await GetWatchedMovieAction(user.user_id);
    if (!genres.success) {
        res.status(genres.code).send({ message: 'ko', error: genres.error, tag: genres.tag });
        return;
    }
    res.status(200).send({ message: 'ok', data: genres });
};