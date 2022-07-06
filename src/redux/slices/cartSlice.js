import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
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
        minusItem(state, action) {
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
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            state.totalPrice -= action.payload.price;
            state.totalCount -= 1;
        },
        clearItems(state, action) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
