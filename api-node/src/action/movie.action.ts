import { ErrorCode, ErrorDB, ErrorMessage, newErrorDB } from '../database/errors';
import { DatabaseError } from 'pg';
import knex from '../database/database';
import { IKnexRaw } from '../types/auth.types';
import { LikedRow } from '../types/movie.types';

const GetGenreMovieSQL = `
SELECT
    id,
    user_id,
    genre_name
FROM genre_list
WHERE user_id = ?;
`;

type GetGenreMovieRow = {
    id: number,
    user_id: string,
    genre_name: string,
    success: true
}


export const getGenreMovieAction = async(userId : string) => {
    const res = await knex.raw(GetGenreMovieSQL, [userId]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as GetGenreMovieRow)).catch((e : DatabaseError) => {

        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_GENRES_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_GENRES_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_GENRES_500', 500, e);
    });
    return res;
};


const SendGenreMovieSQL = `
INSERT INTO genre_list (id, user_id, genre_name)
VALUES (?, ?, ?)
RETURNING id, user_id, genre_name;
`;

type SendGenreMovieRow = {
    id: number,
    user_id: string,
    genre_name: string,
    success: true
}

export const sendGenreMovieAction = async(userId: string, id: number, genreName: string) => {
    const res = await knex.raw(SendGenreMovieSQL, [id, userId, genreName]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as SendGenreMovieRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_GENRES_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_GENRES_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_GENRES_500', 500, e);
    });
    return res;
};

const GetLikedMovieSQL = `
SELECT
movie
FROM liked_movie
WHERE user_id = ?;
`;

type GetLikedMovieRow = {
    liked: LikedRow[]
    success: true
}

export const getLikedMovieAction = async(userId: string) => {
    const res = await knex.raw(GetLikedMovieSQL, [userId]).then((res: IKnexRaw) => ({liked: res.rows, success: true} as GetLikedMovieRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_LIKED_MOVIE_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_LIKED_MOVIE_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_LIKED_MOVIE_500', 500, e);
    });
    return res;
};

type SendLikedMovieRow = {
    liked: LikedRow
    success: true
}

const SendLikedMovieSQL = `
INSERT INTO liked_movie (user_id, movie)
VALUES (?, ?::jsonb)
RETURNING movie;
`;

export const sendLikedMovieAction = async(userId: string, movie: LikedRow) => {
    const res = await knex.raw(SendLikedMovieSQL, [userId, JSON.stringify(movie)]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as SendLikedMovieRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_LIKED_MOVIE_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_LIKED_MOVIE_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_LIKED_MOVIE_500', 500, e);
    });
    return res;
};

const CreatePlaylistSQL = `
INSERT INTO playlists (user_id, playlist_name)
VALUES (?, ?)
RETURNING user_id, playlist_name;
`;

interface CreatePlaylistRow {
    user_id: string,
    playlist_name: string,
    success: true
}

export const createPlaylistAction = async(userId: string, playlist_name: string) => {
    const res = await knex.raw(CreatePlaylistSQL, [userId, playlist_name]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as CreatePlaylistRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'CREATE_PLAYLIST_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'CREATE_PLAYLIST_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'CREATE_PLAYLIST_500', 500, e);
    });
    return res;
};

const AddMovieToPlaylistSQL = `
INSERT INTO movies (playlist_id, movie)
VALUES (?, ?)
RETURNING playlist_id, movie;
`;

interface AddMovieToPlaylistRow {
    playlist_id: string,
    movie: LikedRow,
    success: true
}

export const AddMovieToPlaylistAction = async(playlist_id: string, movie: LikedRow) => {
    const res = await knex.raw(AddMovieToPlaylistSQL, [playlist_id, JSON.stringify(movie)]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as AddMovieToPlaylistRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_LIKED_MOVIE_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_LIKED_MOVIE_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_LIKED_MOVIE_500', 500, e);
    });
    return res;
};

const GetAllPlaylistSQL = `
SELECT
id,
playlist_name
FROM playlists
WHERE user_id = ?;
`;

interface GetAllPlaylistRow {
    playlists: [
        {
            playlist_id: string,
            movie: LikedRow,
        }
    ]
    success: true
}

export const GetAllPlaylistAction = async(userId: string) => {
    const res = await knex.raw(GetAllPlaylistSQL, [userId]).then((res: IKnexRaw) => ({playlists: res.rows, success: true} as GetAllPlaylistRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_ALL_PLAYLIST_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_ALL_PLAYLIST_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_ALL_PLAYLIST_500', 500, e);
    });
    return res;
};

const GetPlaylistByIdSQL = `
SELECT
movie
FROM movies
WHERE playlist_id = ?;
`;

interface GetPlaylistByIdRow {
    movies: LikedRow[],
    success: true
}

export const GetPlaylistByIdAction = async(playlist_id: string) => {
    const res = await knex.raw(GetPlaylistByIdSQL, [playlist_id]).then((res: IKnexRaw) => ({movies: res.rows, success: true} as GetPlaylistByIdRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_PLAYLIST_BY_ID_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_PLAYLIST_BY_ID_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_PLAYLIST_BY_ID_500', 500, e);
    });
    return res;
};

const AddWatchedMovieSQL = `
INSERT INTO seen_movie (user_id, movie)
VALUES (?, ?)
RETURNING movie;
`;

type AddWatchedMovieRow = {
    watched: LikedRow
    success: true
}

export const AddWatchedMovieAction = async(userId: string, movie: LikedRow) => {
    const res = await knex.raw(AddWatchedMovieSQL, [userId, JSON.stringify(movie)]).then((res: IKnexRaw) => ({...res.rows[0], success: true} as AddWatchedMovieRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'SEND_LIKED_MOVIE_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'SEND_LIKED_MOVIE_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'SEND_LIKED_MOVIE_500', 500, e);
    });
    return res;
};

const GetWatchedMovieSQL = `
SELECT
movie
FROM seen_movie
WHERE user_id = ?;
`;

type GetWatchedMovieRow = {
    watched: LikedRow[]
    success: true
}

export const GetWatchedMovieAction = async(userId: string) => {
    const res = await knex.raw(GetWatchedMovieSQL, [userId]).then((res: IKnexRaw) => ({watched: res.rows, success: true} as GetWatchedMovieRow)).catch((e: DatabaseError) => {
        if (e.code === ErrorCode.UNDEFINED_TABLE) {
            return newErrorDB(ErrorMessage.ERROR_TABLE_42P01, 'GET_WATCHED_MOVIE_42P01', 500, e);
        }
        if (e.code === ErrorCode.INVALID_TEXT_REPRESENTATION) {
            return newErrorDB(ErrorMessage.ERROR_22P02, 'GET_WATCHED_MOVIE_22P02', 400, e);
        }
        return newErrorDB(e.detail ? e.detail : ErrorMessage.ERROR_UNKNOWN, 'GET_WATCHED_MOVIE_500', 500, e);
    });
    return res;
};