import React, { useEffect, useState, useContext, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const sortType = sort.sortProperty;

    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onPageChange = (number) => {
        dispatch(setCurrentPage(number));
    };

    const fetchPizzas = () => {
        setIsLoading(true);

        const sortBy = sortType.replace('-', '');
        const order = sortType.startsWith('-', 0) ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}&` : '';
        const search = searchValue.length > 0 ? `&title=${searchValue}` : '';

        axios
            .get(
                `https://62987839de3d7eea3c68151b.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`,
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    };

    const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
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
        !isSearch.current && fetchPizzas();

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
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onPageChangeHandler={onPageChange} />
        </div>
    );
};

export default Home;
