import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getPlaylistContent } from '../request/movie';

type PlaylistContentProps = {
    playlistId: string;
};

export const PlaylistContent = ({ playlistId }: PlaylistContentProps) => {
    const navigate = useNavigate();
    const { accessToken, authToken, setAccessToken } = useContext(AuthContext);
    const { data, isSuccess } = useQuery(
        ['playlistAllContent', accessToken, authToken, playlistId],
        () => getPlaylistContent({ accessToken: accessToken, authToken: authToken, playlistId: playlistId }),
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

    return (
        <div className='space-y-2 mt-4'>
            {isSuccess &&
                data.data.movies?.map((i: any, key: number) => {
                    return (
                        <div
                            onClick={() => navigate(`/movie/${i.movie.id}`)}
                            className='flex items-center justify-between hover:bg-gray-600'
                            key={key}
                        >
                            <div className='font-semibold text-lg'>{i.movie.original_title}</div>
                            <img
                                className='w-10 h-10 object-cover'
                                src={`https://www.themoviedb.org/t/p/original/${i.movie.poster_path}`}
                                alt={i.movie.title}
                            />
                        </div>
                    );
                })}
        </div>
    );
};
