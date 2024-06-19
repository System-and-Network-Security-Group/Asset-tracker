import SvgColor from 'src/components/svg-color';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
 

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Assets',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Items',
    path: '/products',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'logout',
    // onClick: () => {
    //   setIsLoggedIn(false);
    //   path: '/login'
    // },
    path: '/login',
    icon: icon('ic_lock'),
    component: Button, // Use MUI Button component
    sx: { textTransform: 'none' }, // Remove uppercase transformation
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
