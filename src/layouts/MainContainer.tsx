import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainContainer = () => (
  <Container
    maxWidth={false}
    disableGutters
    // fixed
    sx={{
      width: '100%',
      maxWidth: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: { xs: 10, sm: 15 },
      backgroundColor: 'background.default',
    }}
  >
    <Navbar />
    <Outlet />
    <Footer />
  </Container>
);

export default MainContainer;
