import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/filter/filterSlice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';
import { filterSelector } from '../redux/filter/selectors';
import { pizzaSelector } from '../redux/pizza/selectors';

import { Categories, Pagination, PizzaBlock, Skeleton, Sort } from '../components';

const Home = () => {
    const dispatch = useAppDispatch();

    const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
    const { items, status } = useSelector(pizzaSelector);

    const sortType = sort.sortProperty;

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const onPageChange = (number: number) => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        const sortBy = sortType.replace('-', '');
        const order = sortType.startsWith('-', 0) ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}&` : '';
        const search = searchValue.length > 0 ? `&title=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );

        window.scrollTo(0, 0);
    };

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        getPizzas();
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onCategoryClickHandler={onClickCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onPageChangeHandler={onPageChange} />
        </div>
    );
};

export default Home;
