import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { ICartSliceState, TCartItem } from './types';

const initialState: ICartSliceState = getCartFromLS();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TCartItem>) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem) {
                findItem.count += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice += action.payload.price;
            state.totalCount += 1;
        },
        minusItem(state, action: PayloadAction<TCartItem>) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem) {
                if (findItem.count > 1) {
                    findItem.count -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                }
            }

            state.totalPrice -= action.payload.price;
            state.totalCount -= 1;
        },
        removeItem(state, action: PayloadAction<TCartItem>) {
            const item = state.items.filter((item) => item.id === action.payload.id);
            const count = item[0].count;

            state.items = state.items.filter((item) => item.id !== action.payload.id);
            state.totalPrice -= action.payload.price * count;
            state.totalCount -= count;
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
