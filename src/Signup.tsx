import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import bgAll from '../assets/bgf.png';
import logo from '../assets/logo.png';
import { AuthContext } from './context/AuthContext';
import { signup } from './request/request';

export const Signup = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const [email, setEmail] = useState<string>(location.state as string);
    const [pwd, setPwd] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { authToken, setAccessToken } = useContext(AuthContext);
    const { mutate, data } = useMutation(signup);

    const signupUser = () => {
        mutate(
            { authToken: authToken, email: email, password: pwd },
            {
                onSuccess: data => {
                    if (isChecked && data.message === 'ok') {
                        localStorage.setItem('refreshToken', data.data.refresh_token);
                        localStorage.setItem('accessToken', data.data.access_token);
                    }
                    data.message === 'ok' && setAccessToken(data.data.access_token);
                    data.message === 'ok' && navigation('/categories');
                }
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='bg-cover h-screen relative px-10'
            style={{ backgroundImage: `url(${bgAll})` }}
        >
            <img src={logo} alt='logo' className='w-28 pt-4' />
            <div className='text-white'>
                <div className='absolute bg-black/60 w-1/4 p-16 rounded-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6 text-center'>
                    <div className='flex flex-col space-y-14'>
                        <div className=' text-4xl font-semibold'>Sign Up</div>
                        <div className='flex flex-col space-y-4 mt-8'>
                            <input
                                onChange={e => setEmail(() => e.target.value)}
                                value={email}
                                placeholder='Email'
                                className='focus:outline-none rounded-sm px-4 py-4 bg-[#333333] placeholder:text-gray-400'
                            />
                            <input
                                onChange={e => setPwd(() => e.target.value)}
                                type='password'
                                placeholder='Password'
                                className='focus:outline-none rounded-sm px-4 py-4 bg-[#333333] placeholder:text-gray-400'
                            />
                        </div>
                        {data?.message === 'ko' && <div className='text-white'>Email or password already used.</div>}
                        <button
                            className='rounded-sm text-center font-semibold text-lg bg-[#E50914] py-2 px-8'
                            onClick={signupUser}
                        >
                            Sign up
                        </button>
                        <div className='flex items-center'>
                            <input
                                defaultChecked={isChecked}
                                onClick={() => setIsChecked(!isChecked)}
                                className='h-4 w-10'
                                type={'checkbox'}
                            />
                            <span>Remember me</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
