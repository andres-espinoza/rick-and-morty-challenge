import { Paper } from '@mui/material';
import { BorderRadius } from '../../theme';

const CustomPaper = (props: any) => (
  <Paper
    sx={{
      borderRadius: BorderRadius.Filter,
    }}
    {...props}
  />
);

export default CustomPaper;
