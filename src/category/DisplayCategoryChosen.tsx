import { useQuery } from 'react-query';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getMovieByCategory } from '../request/request';
import { CategoryMovieCard } from './CategoryMovieCard';

type DisplayCategoryChosenProps = {
    id: number;
    categoryName: string;
    sort?: boolean;
    filter?: string | undefined;
};

type genreProps = {
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

export const DisplayCategoryChosen = ({ id, categoryName, sort, filter = 'en' }: DisplayCategoryChosenProps) => {
    const { setAccessToken } = useContext(AuthContext);
    const { data, isSuccess } = useQuery(
        ['category', id, filter],
        () => getMovieByCategory({ genreId: id, originalLanguage: filter }),
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

    const [isClickable, setIsClickable] = useState<boolean>(false);
    const [carouselMaxWidth, setCarouselMaxWidth] = useState<number>(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const dateSorting = useMemo(
        () =>
            data?.results?.sort((a: genreProps, b: genreProps) =>
                sort
                    ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
                    : new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
            ),
        [data?.results, sort]
    );

    useEffect(() => {
        if (ref && ref.current) {
            const tmp = ref.current?.scrollWidth - ref.current?.offsetWidth;
            setCarouselMaxWidth(() => tmp);
        }
    }, [isSuccess]);

    return (
        <div className='bg-black'>
            {isSuccess && (
                <div>
                    <div className='text-white font-semibold text-3xl mb-4'>{categoryName}</div>
                    <div ref={ref} className='overflow-x-hidden'>
                        <motion.div
                            drag='x'
                            dragConstraints={{ right: 0, left: -carouselMaxWidth }}
                            style={{ width: carouselMaxWidth }}
                            className='flex min-w-fit space-x-5 cursor-grab'
                            onDragStartCapture={() => setIsClickable(() => true)}
                            onDragEndCapture={() => setIsClickable(() => false)}
                        >
                            {dateSorting.map((i: genreProps, key: number) => {
                                return (
                                    <CategoryMovieCard
                                        id={i.id}
                                        isClickable={isClickable}
                                        poster={i.poster_path}
                                        key={key}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
};
