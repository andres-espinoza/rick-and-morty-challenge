import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import useScrollTop from '../hooks/useScrollTop';
// import { CharacterSliceShape } from '../store/slices/types';

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
  // La data que se muestra en la pagina seleccionada
  // const paginateData = (
  //   page: number,
  //   data: CharacterSliceShape['charactersBasicData'],
  //   amountPerPage = 24
  // ) => {
  //   if (!data || data.length < 1) return [];
  //   const from = amountPerPage * page - amountPerPage;
  //   const to = amountPerPage * page;
  //   return data.slice(from, to);
  // };
  useScrollTop(page);
  return (
    <Stack
      spacing={2}
      marginX="auto"
      maxWidth="fit-content"
      padding={5}
    >
      <Pagination
        page={page}
        onChange={handleChange}
        count={count === 0 ? 1 : count}
        renderItem={(item) => (
          <PaginationItem
            // component={Link}
            // to={`/characters${!item.page ? '' : `?page=${item.page}`}`}
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
