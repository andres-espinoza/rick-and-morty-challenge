import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import useScrollTop from '../hooks/useScrollTop';

interface CustomPaginationProps {
  count: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination = ({
  count,
  handleChange,
  page,
}: CustomPaginationProps) => {
  useScrollTop(page);
  return (
    <Stack
      spacing={2}
      marginX="auto"
      maxWidth="fit-content"
      padding={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        page={page}
        onChange={handleChange}
        count={count === 0 ? 1 : count}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </Stack>
  );
};

export default CustomPagination;
