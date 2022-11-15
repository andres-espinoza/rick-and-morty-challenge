import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

interface CustomPaginationProps {
  // handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  currentPage: number;
}

const CustomPagination = ({
  // handleChange,
  currentPage,
}: CustomPaginationProps) => {
  // const [page, setPage] = React.useState(1);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  return (
    <Stack
      spacing={2}
      marginX="auto"
      maxWidth="fit-content"
      padding={5}
    >
      <Pagination
        count={10}
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
