import { createContext, useState } from 'react';

type Child = {
    children: React.ReactNode;
};

type categoryProps = {
    categories: { id: number; name: string }[];
    setCategories: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
};

export const CategoryContext = createContext<categoryProps>({
    categories: [{ id: 0, name: '' }],
    setCategories: () => [{}]
});

const CategoryContextProvider = ({ children }: Child) => {
    const [categories, setCategories] = useState([{ id: 0, name: '' }]);

    return <CategoryContext.Provider value={{ categories, setCategories }}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;
