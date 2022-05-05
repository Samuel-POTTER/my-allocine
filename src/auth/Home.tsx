import { FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

import bgAll from '../assets/bgf.png';
import logo from '../assets/logo.png';

export const Home = () => {
    const [email, setEmail] = useState<string>('');
    const navigation = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: 2000, opacity: 0 }}
            transition={{ duration: 2 }}
            className='bg-cover h-screen relative px-10'
            style={{ backgroundImage: `url(${bgAll})` }}
        >
            <div className='text-white'>
                <motion.div
                    initial={{ x: -5000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 2, delay: 2, type: 'spring', bounce: 0.15 }}
                    className='flex justify-between pt-4'
                >
                    <img src={logo} alt='logo' className='w-28' />
                    <Link to='/login'>
                        <button className='bg-[#E50914] py-2 px-6 rounded-sm'>Login</button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 4 }}
                    className='absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6 text-center'
                >
                    <div className=' text-6xl font-semibold text-center'>
                        The reference site for movies and TV series!
                    </div>
                    <div className='text-xl '>Get movie informations at anytime.</div>
                    <div className='flex justify-center'>
                        <input
                            onChange={e => setEmail(() => e.target.value)}
                            placeholder='Email address'
                            className='py-2 placeholder:text-gray-400 px-8 text-black focus:outline-none'
                        />
                        <button
                            onClick={() => navigation('/signup', { state: email })}
                            className='flex space-x-4 items-center text-lg bg-[#E50914] py-2 px-8 '
                        >
                            <span>Get Started</span>
                            <FaChevronRight />
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
