import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62987839de3d7eea3c68151b.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
            </div>
        </>
    );
};

export default Home;