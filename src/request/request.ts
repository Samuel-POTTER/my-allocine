import axios, { AxiosError } from 'axios'

const URL_LINK = 'https://api.themoviedb.org/3'
const API = `?api_key=${process.env.REACT_APP_API_KEY}`

export const getCategory = async () => {
    const res = await axios(`${URL_LINK}/genre/movie/list${API}&language=en-US`, {
        method: 'GET'
    })
    return res.data;
}

type getMovieByCategoryProps = {
    genreId : number,
    originalLanguage: string | undefined
}

export const getMovieByCategory = async ({genreId, originalLanguage} : getMovieByCategoryProps) => {
    const res = await axios(`${URL_LINK}/discover/movie${API}&with_genres=${genreId}&with_original_language=${originalLanguage}`, {
        method: 'GET'
    })
    return res.data;
}

type searchMovieProps = {
    movieName: string
}

export const searchMovie = async ({movieName} : searchMovieProps) => {
    const res = await axios(`${URL_LINK}/search/movie${API}&language=en-US&query=${movieName}&page=1&include_adult=false`, {
        method: 'GET'
    })
    return res.data;
}

type getMovieDetailsProps = {
    movieId: string | number | undefined
}

export const getMovieDetails = async ({movieId} : getMovieDetailsProps) => {
    const res = await axios(`${URL_LINK}/movie/${movieId}${API}&language=en-US`, {
        method: 'GET'
    })
    return res.data;
}

export const getMovieVideo = async ({movieId} : getMovieDetailsProps) => {
    const res = await axios(`${URL_LINK}/movie/${movieId}/videos${API}&language=en-US`, {
        method: 'GET'
    })
    return res.data;
}

export const getAuthorization = async() => {
    const res = await axios('http://localhost:8089/authorization', {
        method: 'GET'
    })
    return res.data;
}

type signInProps = {
    authToken: string,
    email: string,
    password: string
}

type signInSuccessProps = {
    data: {
        access_token: string,
        refresh_token: string,
    },
    message: "ok"
}

type signInErrorProps = {
    status: number,
    message: 'ko' 
}

export const signin = async({authToken, email, password} : signInProps) => {
    return await axios('http://localhost:8089/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        data: {
            email: email,
            password: password
        }
    }).then((res) => {
        return res.data as signInSuccessProps;
    }).catch((e : AxiosError) => {
        return {status: e.response?.status, message: 'ko'} as signInErrorProps
    })
}

export const signup = async({authToken, email, password} : signInProps) => {
    return await axios('http://localhost:8089/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        data: {
            email: email,
            password: password
        }
    }).then((res) => {
        return res.data as signInSuccessProps;
    }).catch((e : AxiosError) => {
        return {status: e.response?.status, message: 'ko'} as signInErrorProps
    })
}

type refreshTokensignInProps = {
    authToken: string,
    refreshToken: string
}

export const refreshToken = async({authToken, refreshToken} : refreshTokensignInProps) => {
    const res = await axios('http://localhost:8089/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        data: {
            refresh_token: refreshToken
        }
    })
    return res.data;
}