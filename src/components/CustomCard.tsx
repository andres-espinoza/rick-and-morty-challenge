import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { OutlinedFavoriteIcon } from './icons';
// import { CSSProperties } from 'react';

export interface EmployeeCardProps {
  name: string;
  imageSource: string;
  id: string;
}

const CustomCard = ({ name, imageSource, id }: EmployeeCardProps) => {
  return (
    <Card
      sx={{
        overflow: 'hidden',
        padding: '0px',
        boxShadow: 1,
        ':hover': {
          boxShadow: 2,
        },
        maxWidth: '300px',
        width: { xs: '200px', sm: '180px', md: '185px', lg: '200px' },
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          heigth: 'auto',
          padding: '0px',
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <>
          <Button
            sx={{
              padding: 0,
            }}
            onClick={() => console.log(id)}
          >
            <img
              src={imageSource}
              alt={name}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1',
              }}
            />
          </Button>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={3}
            height="100%"
            width="100%"
            spacing={2}
          >
            <Typography
              variant="subtitle2"
              width="max-content"
            >
              {`#${id} - ${name}`}
            </Typography>
            <OutlinedFavoriteIcon color="primary" />
          </Stack>
        </>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
