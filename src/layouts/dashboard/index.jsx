import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/iconify';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children, isLoggedIn, logout }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>

        {isLoggedIn && (
          <IconButton color="inherit" onClick={logout}>
            <Iconify icon="eva:log-out-outline" />
          </IconButton>
        )}
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};
