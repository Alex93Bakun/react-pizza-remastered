import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (ASC)',
        sortProperty: 'rating',
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sortBy;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
