import { Request, Response } from 'express';
import { LikedRow } from 'types/movie.types';
import { requestValidators } from '../request/requests';

export interface sendGenreMovieParams {
    id: number,
    genre_name: string,
}

export const sendGenreMovieData = async(req: Request, res: Response) => {
    const payload = {
        id: 'number|required',
        genre_name: 'string|required'
    };
    const isValid = await requestValidators(payload, req, res);
    return isValid ? req.body as sendGenreMovieParams : false; 
};

type LikedParams = LikedRow

export const sendLikedMovieData = async(req: Request, res: Response) => {
    const payload = {
        movie: 'object|required'
    };
    const isValid = await requestValidators(payload, req, res);
    return isValid ? req.body as LikedParams : false;
};

export interface CreatePlaylistParams {
    playlist_name: string
}

export const createPlaylistData = async(req: Request, res: Response) => {
    const payload = {
        playlist_name: 'string|required'
    };
    const isValid = await requestValidators(payload, req, res);
    return isValid ? req.body as CreatePlaylistParams : false;
};

export interface addMovieToPlaylistParams {
    playlist_id: string,
    movie: LikedRow
}

export const addMovieToPlaylistData = async(req: Request, res: Response) => {
    const payload = {
        playlist_id: 'string|required',
        movie: 'object|required'
    };
    const isValid = await requestValidators(payload, req, res);
    return isValid ? req.body as addMovieToPlaylistParams : false;
};

interface GetPlaylistByIdParams {
    playlist_id: 'string|required'
}

export const getPlaylistByIdData = async(req: Request, res: Response) => {
    const payload = {
        playlist_id: 'string|required',
    };
    const isValid = await requestValidators(payload, req, res);
    return isValid ? req.body as GetPlaylistByIdParams : false;
};
