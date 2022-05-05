import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getGenreMovie } from '../request/movie';
import { searchMovie } from '../request/request';
import { useToggle } from '../hooks/useToggle';
import { OtherCategoryProposition } from './OtherCategoryProposition';
import { InputSearchResult } from './InputSearchResult';

import logo from '../assets/logo.png';
import useDebounce from '../hooks/useDebounce';
import { DisplayCategoryChosen } from './DisplayCategoryChosen';
import { BsSortDownAlt, BsSortUp } from 'react-icons/bs';

export const DisplayPerCategory = () => {
    const [sort, setSort] = useState<boolean>(false);
    const [languageFilter, setLanguageFilter] = useState<string>('en');

    const [toggle, setToggle] = useToggle();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const { accessToken, authToken, setAccessToken } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const { data: genre, isSuccess: success } = useQuery(
        ['getGenre', accessToken, authToken],
        () =>
            getGenreMovie({
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
            }
        }
    );
    const val = useDebounce(searchQuery !== '', 2000);
    const { data, isSuccess } = useQuery(
        ['searchMovie', searchQuery],
        () =>
            searchMovie({
                movieName: searchQuery
            }),
        { enabled: val }
    );

    return (
        <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onClick={setToggle}
            className='bg-black relative px-10 pt-4'
        >
            <div className='flex justify-between text-white mb-10 px-10 pt-4'>
                <Link to='/'>
                    <img src={logo} alt='logo' className='w-28' />
                </Link>
                <input
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        setToggle(setToggle);
                    }}
                    placeholder='search for movie...'
                    className='bg-white text-black rounded-md focus:outline-none p-2 w-1/4 '
                />
                <div className='flex space-x-4'>
                    <Link to='/playlist'>
                        <div className='cursor-pointer font-semibold'>Playlist</div>
                    </Link>
                    <Link to='/liked'>
                        <div className='cursor-pointer font-semibold'>Liked</div>
                    </Link>
                    <Link to='/watched'>
                        <div className='cursor-pointer font-semibold'>Watched</div>
                    </Link>
                </div>
            </div>
            <div className='flex justify-end items-center space-x-4'>
                <select
                    title='Filter by original language'
                    defaultValue={languageFilter}
                    onChange={e => {
                        setLanguageFilter(e.target.value);
                        queryClient.invalidateQueries('category');
                    }}
                    className='bg-black border-2 cursor-pointer rounded-md py-1 border-[#222] focus:outline-none text-lg text-[#6d6d6d]'
                >
                    <option key='1' value='en'>
                        English
                    </option>
                    <option key='2' value='fr'>
                        French
                    </option>
                    <option key='3' value='jp'>
                        Japanese
                    </option>
                </select>
                {sort ? (
                    <BsSortDownAlt
                        title='Filter by release date'
                        onClick={() => setSort(!sort)}
                        className='text-white w-8 h-8 cursor-pointer'
                    />
                ) : (
                    <BsSortUp
                        title='Filter by release date'
                        onClick={() => setSort(!sort)}
                        className='text-white w-8 h-8 cursor-pointer'
                    />
                )}
            </div>
            {toggle && <InputSearchResult data={data} isSuccess={isSuccess} />}
            {success && (
                <div className='py-8'>
                    <DisplayCategoryChosen
                        key={1}
                        filter={languageFilter}
                        sort={sort}
                        categoryName={genre.data.genre_name}
                        id={genre.data.id}
                    />
                    <OtherCategoryProposition />
                </div>
            )}
        </motion.div>
    );
};
