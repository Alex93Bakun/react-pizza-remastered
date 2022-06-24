import React from 'react';

import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onPageChangeHandler }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onPageChangeHandler(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
