import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../assets/homebg.png';
import { AuthContext } from '../context/AuthContext';
import { getAllWatchedMovie } from '../request/movie';
import { Navbar } from '../Navbar';
import { CardDetail } from '../CardDetail';

type movieProps = {
    movie: {
        adult: boolean;
        backdrop_path: string;
        genre_ds: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: number;
        vote_average: number;
        vote_count: number;
    };
};

type genreProps = {
    movie: movieProps;
};

export const Watched = () => {
    const navigate = useNavigate();
    const { accessToken, authToken, setAccessToken } = useContext(AuthContext);
    const { data, isSuccess } = useQuery(
        ['watchedMovie', accessToken, authToken],
        () =>
            getAllWatchedMovie({
                accessToken: accessToken,
                authToken: authToken
            }),
        {
            onError: (e: AxiosError) => {
                if (e.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setAccessToken('');
                }
            },
            onSuccess: data => console.log(data)
        }
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='text-white px-10 bg-cover h-screen bg-no-repeat'
            style={{ backgroundImage: `url(${Logo})` }}
        >
            <Navbar />
            <div className='text-4xl uppercase font-bold tracking-tighter'>All watched movie</div>
            <div className='grid xl:grid-cols-4 grid-cols-2 my-10'>
                {isSuccess &&
                    data.data.watched.map((i: genreProps, key: number) => {
                        return (
                            <div key={key}>
                                <CardDetail
                                    id={i.movie.movie.id}
                                    img={`https://www.themoviedb.org/t/p/original${i.movie.movie.poster_path}`}
                                />
                                <div
                                    onClick={() => navigate(`/movie/${i.movie.movie.id}`)}
                                    className='text-white border-white/30 border-2 flex items-center cursor-pointer w-72 justify-center space-x-2 px-2 mt-2'
                                >
                                    <AiFillExclamationCircle />
                                    <div>More infos</div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </motion.div>
    );
};
