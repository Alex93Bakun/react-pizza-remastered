import React, { memo, useState } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = memo(() => {
    const [activeIndex, setActiveIndex] = useState(0);

    const categoryClickHandler = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => categoryClickHandler(i)}
                        className={activeIndex === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
