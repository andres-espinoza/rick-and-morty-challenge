import { TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import debounce from 'lodash.debounce';

interface CustomInputProps {
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label?: string;
}

const CustomInput = ({ handleChange, label = '' }: CustomInputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-call
  const debounceHandleChange = useCallback(debounce(handleChange, 400), []);

  return (
    <TextField
      label={label}
      placeholder="search"
      multiline
      variant="outlined"
      sx={{
        minWidth: '260px',
        maxWidth: '300px',
        marginX: 'auto',
        marginTop: 3,
      }}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange={debounceHandleChange}
    />
  );
};

export default CustomInput;
