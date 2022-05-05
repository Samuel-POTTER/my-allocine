import { Home } from './Home';

import tv from '../assets/tv.mp4';
import people from '../assets/people.svg';

export const Info = () => {
    return (
        <div>
            <Home />
            <div className='text-white pt-6 px-52 flex justify-between items-center border-t-8 border-[#222]'>
                <div className='space-y-4'>
                    <div className='text-5xl tracking-tight font-semibold'>Your own playlist.</div>
                    <div className='font-semibold text-xl w-2/3'>
                        Group your favorite movies together in a playlist and get access to them easily.
                    </div>
                </div>
                <video className='w-1/2 h-1/2' autoPlay loop muted>
                    <source src={tv} type='video/mp4' />
                </video>
            </div>
            <div className='text-white pt-6 px-52 flex space-x-24 justify-between items-center border-t-8 border-[#222]'>
                <img src={people} alt='movie' className='w-1/3 h-1/3' />
                <div className='space-y-4'>
                    <div className='text-5xl tracking-tight font-semibold'>Like a movie.</div>
                    <div className='font-semibold text-xl w-2/3'>
                        You liked a movie and you don't want to forget it ? It's easy, add it to your watched movie and
                        you won't loose it anymore.
                    </div>
                </div>
            </div>
        </div>
    );
};
