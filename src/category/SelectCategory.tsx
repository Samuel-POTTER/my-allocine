import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { CategoryContext } from '../context/CategoryContext';
import { AuthContext } from '../context/AuthContext';
import { sendGenreMovie } from '../request/movie';
import { Card } from '../Card';

import category from '../category.json';

type CategoryProps = {
    id: number;
    name: string;
    poster: string;
    backdrop: string;
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
};

export const SelectCategory = () => {
    const { categories } = useContext(CategoryContext);
    const { accessToken, authToken } = useContext(AuthContext);
    const { mutate } = useMutation(sendGenreMovie);

    const sendGenre = () => {
        mutate({
            genreId: categories[1].id,
            genreName: categories[1].name,
            accessToken: accessToken,
            authToken: authToken
        });
    };

    return (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 2 }} className='bg-black p-10'>
            {
                <div>
                    <div className='mb-4 flex items-center justify-between'>
                        <span className='font-bold text-4xl text-white '>Select your favorite movie genre</span>
                        {categories.length === 2 && (
                            <Link to='/movie'>
                                <button onClick={sendGenre} className='bg-[#E50914] text-white py-2 px-6 rounded-sm'>
                                    Confirm
                                </button>
                            </Link>
                        )}
                    </div>
                    <motion.div variants={container} initial='hidden' animate='show' className='grid grid-cols-4 gap-5'>
                        {category.map((i: CategoryProps, key: number) => {
                            return (
                                <motion.div key={key} variants={item}>
                                    <Card text={i.name} img={i.poster} id={i.id} />;
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            }
        </motion.div>
    );
};
