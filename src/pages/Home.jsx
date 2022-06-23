import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности (ASC)',
        sortProperty: 'rating',
    });

    useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.startsWith('-', 0) ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}&` : '';

        fetch(
            `https://62987839de3d7eea3c68151b.mockapi.io/items?${category}sortBy=${sortBy}&order=${order}`,
        )
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onCategoryClickHandler={(id) => setCategoryId(id)} />
                <Sort value={sortType} onSortClickHandler={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
            </div>
        </div>
    );
};

export default Home;
