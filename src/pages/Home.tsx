import React, { useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { filterSelector, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
    const dispatch = useAppDispatch();

    const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
    const { items, status } = useSelector(pizzaSelector);

    const sortType = sort.sortProperty;

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

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
                <Sort />
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
