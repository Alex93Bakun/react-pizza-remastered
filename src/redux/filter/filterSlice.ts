import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, SortPropertyEnum, TSort } from './types';

const initialState: IFilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (ASC)',
        sortProperty: SortPropertyEnum.RATING_ASC,
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<TSort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности (ASC)',
                    sortProperty: SortPropertyEnum.RATING_ASC,
                };
            }
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
