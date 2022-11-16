import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

interface CustomPaginationProps {
  currentPage: number;
  count: number;
}

const CustomPagination = ({ currentPage, count }: CustomPaginationProps) => {
  return (
    <Stack
      spacing={2}
      marginX="auto"
      maxWidth="fit-content"
      padding={5}
    >
      <Pagination
        count={count === 0 ? 1 : count}
        page={currentPage}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/characters${!item.page ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
        sx={{
          width: 'fit-content',
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
