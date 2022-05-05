import { Link } from 'react-router-dom';
import { getCategoryById } from '../utils';

import Logo from '../assets/logo.png';

type searchProps = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
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

type InputSearchResultProps = {
    data: any;
    isSuccess: boolean;
};

export const InputSearchResult = ({ data, isSuccess }: InputSearchResultProps) => {
    return (
        <div className='flex flex-col justify-center absolute inset-x-0 w-1/4 left-[48%] h-72  overflow-y-auto -translate-x-1/2 top-20'>
            {isSuccess &&
                data.results.map((i: searchProps, key: number) => {
                    return (
                        <Link key={key} to={`/movie/${i.id}`}>
                            <div className='flex py-4 space-x-4 cursor-pointer sticky hover:bg-black/95 bg-black/70'>
                                <img
                                    src={`https://www.themoviedb.org/t/p/original${i.poster_path}`}
                                    className='w-24 h-32 rounded-md object-cover'
                                    alt={i.title}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.className = 'object-contain w-24 h-32 rounded-md';
                                        currentTarget.src = Logo;
                                    }}
                                />
                                <div className='w-3/4'>
                                    <div className='text-white text-lg font-semibold'>{i.title}</div>
                                    <div className='text-white/60 text-sm line-clamp-2'>{i.overview}</div>
                                    <div className='text-white/60 text-sm'>
                                        Release date: {new Date(i.release_date).getFullYear()}
                                    </div>
                                    <div className='flex space-x-2'>
                                        {i.genre_ids.map((elem: number, k: number) => {
                                            return (
                                                <div className='text-white/60 text-sm' key={k}>
                                                    {getCategoryById(elem)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};
