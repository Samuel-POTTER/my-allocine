import { AiFillExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CardDetail } from '../CardDetail';

type CategoryMovieCardProps = {
    id: number | undefined;
    poster: string;
    isClickable: boolean;
};

export const CategoryMovieCard = ({ id, poster, isClickable }: CategoryMovieCardProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <CardDetail id={id} img={`https://www.themoviedb.org/t/p/original${poster}`} isClickable={isClickable} />
            <div
                onClick={() => navigate(`/movie/${id}`)}
                className='text-white border-white/30 cursor-pointer border-2 flex items-center w-1/2 justify-center space-x-2 px-2 mt-2'
            >
                <AiFillExclamationCircle />
                <div>More infos</div>
            </div>
        </div>
    );
};
