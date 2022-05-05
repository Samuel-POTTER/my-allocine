import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideo } from './request/request';
import { useMutation, useQuery } from 'react-query';
import { AiFillStar } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import { BsFillHandThumbsUpFill, BsFillEyeFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ActionButtons } from './ActionButtons';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { likeMovie, watchMovie } from './request/movie';
import { Navbar } from './Navbar';
import { AddToPlaylist } from './playlist/AddToPlaylist';

import ReactPlayer from 'react-player';
import { useToggle } from './hooks/useToggle';

export const MovieInfo = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showModal, setShowModal] = useToggle();
    const { setAccessToken, authToken, accessToken } = useContext(AuthContext);
    const { id } = useParams();
    const { data, isSuccess } = useQuery(['movieInfos', id], () => getMovieDetails({ movieId: id }), {
        onError: (e: AxiosError) => {
            if (e.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setAccessToken('');
            }
        }
    });

    const { mutate } = useMutation(likeMovie);
    const { mutate: watched } = useMutation(watchMovie);
    const movieVideo = useQuery(['movieVideos', id], () => getMovieVideo({ movieId: id }));

    return (
        <>
            {isSuccess && movieVideo.isSuccess && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className='text-white h-screen'
                >
                    <div className='bg-black/50 absolute inset-x-0 h-full' />
                    <div
                        className=' h-full bg-no-repeat bg-cover'
                        style={{
                            backgroundImage: `url(https://www.themoviedb.org/t/p/original/${data.backdrop_path})`
                        }}
                    >
                        {!isVisible && (
                            <ReactPlayer
                                controls={false}
                                playing
                                onEnded={() => setIsVisible(true)}
                                className='relative'
                                width='100%'
                                height='100%'
                                volume={0.1}
                                onError={() => setIsVisible(true)}
                                url={`https://www.youtube.com/embed/${movieVideo.data.results[0]?.key}`}
                            />
                        )}
                        <div className='relative'>
                            <Navbar />
                        </div>
                        <div className='absolute px-10 inset-x-0 space-y-4 top-1/2 -translate-y-1/2 w-1/3'>
                            <div className='space-y-2'>
                                <div className='text-4xl font-bold'>{data.original_title}</div>
                                <div>
                                    <span className='border-2 border-white px-2 rounded-sm'>
                                        {new Date(data.release_date).getFullYear()}
                                    </span>
                                </div>
                            </div>
                            <div className='font-semibold text-xl'>{data.overview}</div>
                            <div className='flex items-center space-x-2 w-32 py-1 justify-center rounded-md bg-white/20'>
                                <AiFillStar />
                                <span>{data.vote_average * 10}% Match</span>
                            </div>
                            <div>
                                <div className='text-white/60 font-semibold'>Genres</div>
                                <div className='-space-y-2'>
                                    {data.genres.map((i: { id: number; name: string }, key: number) => {
                                        return <div key={key}>{i.name}</div>;
                                    })}
                                </div>
                            </div>
                            <motion.div className='flex items-center'>
                                <div
                                    onClick={() =>
                                        mutate({ accessToken: accessToken, authToken: authToken, movie: data })
                                    }
                                >
                                    <ActionButtons key={1} btn={<BsFillHandThumbsUpFill className='w-6 h-6' />} />
                                </div>
                                <div
                                    onClick={() =>
                                        watched({ accessToken: accessToken, authToken: authToken, movie: data })
                                    }
                                >
                                    <ActionButtons key={2} btn={<BsFillEyeFill className='w-6 h-6' />} />
                                </div>
                                <div onClick={setShowModal}>
                                    <ActionButtons key={3} btn={<MdPlaylistAdd className='w-6 h-6' />} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <AddToPlaylist movie={data} isVisible={showModal} setIsVisible={setShowModal} />
                </motion.div>
            )}
        </>
    );
};
