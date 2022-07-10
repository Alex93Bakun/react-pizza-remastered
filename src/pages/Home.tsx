import React, { useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterSelector,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

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
            // @ts-ignore
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
    };

    const pizzas = items.map((item: any) => (
        <Link to={`pizza/${item.id}`} key={item.id}>
            <PizzaBlock {...item} />
        </Link>
    ));
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find((obj) => obj.sortProperty === params.sortBy);

            dispatch(
                setFilters({
                    ...params,
                    sortBy: sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        !isSearch.current && getPizzas();

        isSearch.current = false;

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sortType,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, searchValue, currentPage]);

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
