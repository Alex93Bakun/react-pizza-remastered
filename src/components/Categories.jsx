import React, { memo } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = memo(({ value, onCategoryClickHandler }) => {
    return (
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
    );
});

export default Categories;
