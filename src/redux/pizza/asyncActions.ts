import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPizza, TSearchPizzaParams } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<TPizza[]>(
            `https://62987839de3d7eea3c68151b.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`,
        );
        return data;
    },
);
