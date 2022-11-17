import { Typography, Stack, Link } from '@mui/material';
import { GitHubIcon, LinkedInIcon } from './icons';

const Footer = () => {
  return (
    <footer
      style={{
        bottom: 0,
        marginTop: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        gap={1}
        padding={2}
      >
        <Stack
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
          gap={2}
        >
          <Link
            href="https://github.com/andres-espinoza"
            target="_blank"
          >
            <GitHubIcon
              color="primary"
              fontSize="medium"
              sx={{
                transition: 'all 300ms ease',
                '&:hover': {
                  transform: 'scale(1.3, 1.3)',
                  transition: 'all 300ms ease',
                },
              }}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/andres-espinoza-delgado-fullstack-developer-typescript-react-nodejs-express-mongodb/"
            target="_blank"
          >
            <LinkedInIcon
              color="primary"
              fontSize="medium"
              sx={{
                transition: 'all 300ms ease',
                '&:hover': {
                  transform: 'scale(1.3, 1.3)',
                  transition: 'all 300ms ease',
                },
              }}
            />
          </Link>
        </Stack>
        <Typography variant="body2">
          &copy; Andrés Espinoza Delgado 2022
        </Typography>
      </Stack>
    </footer>
  );
};

export default Footer;
