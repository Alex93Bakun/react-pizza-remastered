import React, { FC, memo } from 'react';

type TCategoriesProps = {
    value: number;
    onCategoryClickHandler: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: FC<TCategoriesProps> = memo(({ value, onCategoryClickHandler }) => (
    <div className="categories">
        <ul>
            {categories.map((categoryName, i) => (
                <li
                    key={i}
                    onClick={() => onCategoryClickHandler(i)}
                    className={value === i ? 'active' : ''}>
                    {categoryName}
                </li>
            ))}
        </ul>
    </div>
));
