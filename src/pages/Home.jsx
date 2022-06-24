import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности (ASC)',
        sortProperty: 'rating',
    });

    const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.startsWith('-', 0) ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}&` : '';
        const search = searchValue.length > 0 ? `&title=${searchValue}` : '';

        fetch(
            `https://62987839de3d7eea3c68151b.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`,
        )
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onCategoryClickHandler={(id) => setCategoryId(id)} />
                <Sort value={sortType} onSortClickHandler={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination onPageChangeHandler={(number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;
