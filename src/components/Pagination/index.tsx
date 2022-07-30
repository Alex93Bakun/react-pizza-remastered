import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type TPaginationProps = {
    onPageChangeHandler: (page: number) => void;
    currentPage: number;
};

export const Pagination: FC<TPaginationProps> = ({ onPageChangeHandler, currentPage }) => (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPageChangeHandler(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
    />
);
