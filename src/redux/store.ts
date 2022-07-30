import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './filter/filterSlice';
import cart from './cart/slice';
import pizza from './pizza/pizzaSlice';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
