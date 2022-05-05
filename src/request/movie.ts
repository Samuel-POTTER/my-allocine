import axios from "axios";

type sendGenreMovieProps = {
    genreId: number,
    genreName: string,
    accessToken: string,
    authToken: string
}

export const sendGenreMovie = async({genreId, genreName, accessToken, authToken} : sendGenreMovieProps) => {
    const res = await axios('http://localhost:8089/movie/genre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        },
        data: {
            id: genreId,
            genre_name: genreName
        }
    })
    return res.data;
}

type Tokens = {
    accessToken: string,
    authToken: string
}

export const getGenreMovie = async({accessToken, authToken} : Tokens) => {
    const res = await axios('http://localhost:8089/movie/genre', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

type LikeMovieProps = {
    accessToken: string,
    authToken: string,
    movie: any
}

export const likeMovie = async({accessToken, authToken, movie} : LikeMovieProps) => {
    const res = await axios('http://localhost:8089/movie/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        },
        data: {
            movie: movie
        }
    })
    return res.data;
}

export const getAllLikedMovie = async({accessToken, authToken} : Tokens) => {
    const res = await axios('http://localhost:8089/movie/like', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

export const watchMovie = async({accessToken, authToken, movie} : LikeMovieProps) => {
    const res = await axios('http://localhost:8089/movie/watch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        },
        data: {
            movie: movie
        }
    })
    return res.data;
}

export const getAllWatchedMovie = async({accessToken, authToken} : Tokens) => {
    const res = await axios('http://localhost:8089/movie/watch', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

type createPlaylistProps = {
    accessToken: string,
    authToken: string,
    playlistName: string
}

export const createPlaylist = async({accessToken, authToken, playlistName} : createPlaylistProps) => {
    const res = await axios('http://localhost:8089/movie/playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        },
        data: {
            playlist_name: playlistName
        }
    })
    return res.data;
}

export const getAllPlaylist = async({accessToken, authToken} : Tokens) => {
    const res = await axios('http://localhost:8089/movie/playlist', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

type getPlaylistContentProps = {
    accessToken: string,
    authToken: string,
    playlistId: string
}

export const getPlaylistContent = async({accessToken, authToken, playlistId} : getPlaylistContentProps) => {
    const res = await axios(`http://localhost:8089/movie/playlistId/${playlistId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

type AddMovieToPlaylistProps = {
    accessToken: string,
    authToken: string,
    movie: any,
    playlistId: string
}

export const addMovieToPlaylist = async({accessToken, authToken, movie, playlistId} : AddMovieToPlaylistProps) => {
    const res = await axios('http://localhost:8089/movie/playlist', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            jwtToken: `Bearer ${accessToken}`
        },
        data: {
            playlist_id: playlistId,
            movie: movie
        }
    })
    return res.data;
}