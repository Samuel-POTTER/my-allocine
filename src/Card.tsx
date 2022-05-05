import { useContext, useState } from 'react';
import { CategoryContext } from './context/CategoryContext';

type CardProps = {
    text: string;
    img: string;
    id: number;
};

export const Card = ({ text, img, id }: CardProps) => {
    const [border, setBorder] = useState<boolean>(false);
    const { categories, setCategories } = useContext(CategoryContext);

    const addCategory = () => {
        if (categories.length !== 2) {
            setBorder(true);
            setCategories(prev => [...prev, { id: id, name: text }]);
        }
        if (
            categories.some(element => {
                return element.id === id;
            })
        ) {
            setBorder(false);
            setCategories(categories.filter(i => i.name !== text));
        }
    };

    return (
        <div
            onClick={addCategory}
            className={`${
                border ? 'border-[#E50914] border-2' : ''
            } w-full h-72  hover:scale-105 duration-200 relative bg-cover rounded-md cursor-pointer`}
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className='bg-black/30 w-full h-full'></div>
            <span className='text-white text-2xl text-center font-semibold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                {text}
            </span>
        </div>
    );
};
