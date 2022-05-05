import { useState } from 'react';
import { motion } from 'framer-motion';
type ActionButtonsProps = {
    btn: any;
};

export const ActionButtons = ({ btn }: ActionButtonsProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <div
            className='px-2 relative cursor-pointer flex justify-center'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {btn}
            {isHover && <motion.div layoutId='underline' className='absolute w-full h-0.5 -bottom-2 bg-white' />}
        </div>
    );
};
