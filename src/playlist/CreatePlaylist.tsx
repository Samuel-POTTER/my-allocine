import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import { createPlaylist } from '../request/movie';

type CreatePlaylistProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePlaylist = ({ isVisible, setIsVisible }: CreatePlaylistProps) => {
    const { authToken, accessToken } = useContext(AuthContext);
    const [playlistName, setPlaylistName] = useState<string>('');
    const { mutate } = useMutation(createPlaylist);
    const queryClient = useQueryClient();

    return (
        <>
            {isVisible && (
                <div>
                    <div onClick={() => setIsVisible(false)} className='absolute inset-0 bg-black/70' />
                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-x-0'>
                        <div className='flex flex-col items-center space-y-4'>
                            <input
                                onChange={e => setPlaylistName(e.target.value)}
                                placeholder='playlist name'
                                className='p-4 w-full rounded-sm placeholder:text-lg focus:outline-none text-black text-lg font-semibold placeholder:font-semibold'
                            />
                            {playlistName.length > 0 && (
                                <button
                                    onClick={() =>
                                        mutate(
                                            {
                                                accessToken: accessToken,
                                                authToken: authToken,
                                                playlistName: playlistName
                                            },
                                            {
                                                onSuccess: () => {
                                                    queryClient.invalidateQueries('AllPlaylist');
                                                    setIsVisible(false);
                                                }
                                            }
                                        )
                                    }
                                    className='bg-[#E50914] py-2 px-8 font-semibold'
                                >
                                    Create playlist
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
