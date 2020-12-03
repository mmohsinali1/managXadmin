import React from "react";

const Pagination = ({itemsPerPage, totalItems, paginate}) => {
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalItems / itemsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
