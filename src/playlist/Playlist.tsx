import { useContext, useState } from 'react';
import { MdAddCircle, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { Navbar } from '../Navbar';
import { AuthContext } from '../context/AuthContext';
import { getAllPlaylist } from '../request/movie';
import { CreatePlaylist } from './CreatePlaylist';
import { PlaylistContent } from './PlaylistContent';

import Logo from '../assets/update.jpg';

export const Playlist = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toggle, setToggle] = useState<any>(null);
    const { authToken, accessToken, setAccessToken } = useContext(AuthContext);
    const { data, isSuccess } = useQuery(
        ['AllPlaylist', authToken, accessToken],
        () => getAllPlaylist({ accessToken: accessToken, authToken: authToken }),
        {
            onError: (e: AxiosError) => {
                if (e.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setAccessToken('');
                }
            }
        }
    );

    const checkToggle = (i: number) => {
        if (toggle === i) return setToggle(null);
        setToggle(i);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='h-screen text-white bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${Logo})` }}
        >
            <div className='bg-black/60 absolute inset-0' />
            <div className='relative h-full'>
                <Navbar />
                {isSuccess && data.data.playlists.length > 0 ? (
                    <div>
                        {data.data.playlists.map((i: { playlist_name: string; id: string }, key: number) => {
                            return (
                                <div key={key}>
                                    <div
                                        onClick={() => {
                                            checkToggle(key);
                                        }}
                                        className='bg-gray-800 cursor-pointer my-2 p-2 rounded-sm w-1/4 m-auto'
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div className='font-semibold text-2xl'>{i.playlist_name}</div>
                                            {toggle === key ? (
                                                <MdExpandMore className='w-10 h-10' />
                                            ) : (
                                                <MdExpandLess className='w-10 h-10' />
                                            )}
                                        </div>
                                        {toggle === key ? <PlaylistContent playlistId={i.id} /> : null}
                                    </div>
                                </div>
                            );
                        })}
                        <div>
                            <MdAddCircle
                                onClick={() => setIsVisible(true)}
                                className='w-14 h-14 cursor-pointer mt-4 text-center m-auto'
                            />
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center space-x-4 items-center'>
                        <span className='font-semibold text-6xl w-1/4 text-center'>
                            No playlist yet. Create a new one.
                        </span>
                        <button onClick={() => setIsVisible(true)}>
                            <MdAddCircle className='w-20 h-20' />
                        </button>
                    </div>
                )}
                <CreatePlaylist isVisible={isVisible} setIsVisible={setIsVisible} />
            </div>
        </motion.div>
    );
};
