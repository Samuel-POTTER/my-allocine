import { Link } from 'react-router-dom';

import logo from './assets/logo.png';

export const Navbar = () => {
    return (
        <div className='flex justify-between text-white mb-10 px-10 pt-4'>
            <Link to='/'>
                <img src={logo} alt='logo' className='w-28' />
            </Link>
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
    );
};
