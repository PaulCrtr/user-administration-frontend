type PaginationProps = {
  resultsPerPage: number;
  totalCount: number;
};

const Pagination = ({ resultsPerPage, totalCount }: PaginationProps) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / resultsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div>
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber}>{pageNumber}</button>
      ))}
    </div>
  );
};

export default Pagination;
