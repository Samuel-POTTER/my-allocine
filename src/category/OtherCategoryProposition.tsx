import { DisplayCategoryChosen } from './DisplayCategoryChosen';

export const OtherCategoryProposition = () => {
    return (
        <div className='mt-10'>
            <div className='text-3xl font-bold mb-4 text-white uppercase'>You may also like those categories</div>
            <DisplayCategoryChosen key={2} categoryName='History' id={36} />;
            <DisplayCategoryChosen key={3} categoryName='Music' id={10402} />;
        </div>
    );
};
