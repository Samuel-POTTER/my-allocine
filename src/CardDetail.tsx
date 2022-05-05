import { motion } from 'framer-motion';

type CardProps = {
    img: string;
    id?: number;
    isClickable?: boolean;
};

export const CardDetail = ({ img, isClickable }: CardProps) => {
    return (
        <motion.div
            className={`${isClickable ? 'pointer-events-none' : ''} w-72 h-96 bg-cover rounded-md cursor-grab`}
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className='bg-black/30 w-full h-full'></div>
        </motion.div>
    );
};
