import { Dispatch, SetStateAction } from 'react';

const handleChangePage =
  (pageSetter: Dispatch<SetStateAction<number>>) =>
  (_event: React.ChangeEvent<unknown>, value: number) => {
    pageSetter(value);
  };

export default handleChangePage;
