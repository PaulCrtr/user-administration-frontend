import { IconButton, Box } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

type PaginationProps = {
  resultsPerPage: number;
  totalCount: number;
  currentPage: number;
  getNextPage: () => void;
  getPreviousPage: () => void;
  next: string | null;
  previous: string | null;
};

const Pagination = ({ resultsPerPage, totalCount, currentPage, getNextPage, getPreviousPage, next, previous }: PaginationProps) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / resultsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <Box mt="12px">
      <IconButton isDisabled={!previous} onClick={getPreviousPage} mr="5px" isRound aria-label="previous" icon={<ArrowLeftIcon />} />
      {paginationNumbers.map((pageNumber) => (
        <IconButton isDisabled={currentPage === pageNumber} mx="2px" isRound aria-label="page" icon={<Box>{pageNumber}</Box>} key={pageNumber} />
      ))}
      <IconButton isDisabled={!next} onClick={getNextPage} ml="5px" isRound aria-label="next" icon={<ArrowRightIcon />} />
    </Box>
  );
};

export default Pagination;
