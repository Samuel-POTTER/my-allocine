import { AxiosError } from 'axios';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import { addMovieToPlaylist, getAllPlaylist } from '../request/movie';

type AddToPlaylistProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    movie: any;
};

export const AddToPlaylist = ({ isVisible, setIsVisible, movie }: AddToPlaylistProps) => {
    const value = 'default';
    const { authToken, accessToken, setAccessToken } = useContext(AuthContext);
    const { mutate } = useMutation(addMovieToPlaylist);
    const { data, isSuccess } = useQuery(
        ['AllPlaylistBack', authToken, accessToken],
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

    const addMovie = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mutate({ accessToken: accessToken, authToken: authToken, playlistId: e.target.value, movie: movie });
        setIsVisible(false);
    };
    return (
        <>
            {isVisible && (
                <div className='fixed top-1/2 left-1/2 inset-x-0 -translate-x-1/2 -translate-y-1/2'>
                    <select
                        defaultValue={value}
                        onChange={e => addMovie(e)}
                        className='bg-black border-2 relative rounded-md py-4 border-[#222] w-full focus:outline-none text-lg text-[#6d6d6d]'
                    >
                        <option value='default' className='text-lg font-semibold text-[#6d6d6d]'>
                            Select a playlist...
                        </option>
                        {isSuccess &&
                            data.data.playlists.map((i: { playlist_name: string; id: string }, key: number) => {
                                return (
                                    <option className='text-lg font-semibold text-[#6d6d6d]' key={key} value={i.id}>
                                        {i.playlist_name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            )}
        </>
    );
};
