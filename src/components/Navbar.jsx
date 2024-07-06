import * as React from 'react';
import { useState } from 'react';
import NavItems from './Data/NavItems';
import RegisterSeller from './RegisterSeller';
// images
import logo from '../Assets/images/logo_2_main.png'

// mui
import { Badge, Button, IconButton, MenuItem } from '@mui/material'
import { ArrowDropDown, Search } from '@mui/icons-material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const drawerWidth = '100%';
// const NavItems = ['Top Deals', 'Popular Products', 'New Arrivals', 'Gift Card'];


const Navbar = (props) => {
  const { window } = props;
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seller, setSeller] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  const toggleSeller = () => {
    setSeller((prevState) => !prevState);
  }

  const drawer = (
    <div className='h-[100vh] flex flex-col items-start justify-center gap'>
      <IconButton onClick={handleDrawerToggle} sx={{ background: 'white', padding: '12px', marginLeft: '26px' }} className='drawer-close-btn mx-8'>
        <CloseIcon sx={{ color: 'black' }} />
      </IconButton>
      <Box onClick={handleDrawerToggle} sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', width: '100%' }}>
        <List sx={{ width: '100%' }}>
          {NavItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton className='drawer-item' sx={{ textAlign: 'center', justifyItems: 'center', display: 'flex', marginTop: '6px', alignItems: 'center' }}>
                <Link className='text-center flex items-center justify-center w-full' to={item.link}>
                  {item.name}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'd2db2862682ea1b7618cca9b3180e04e'
        },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className='sticky top-0 z-10 bg-[#232f3e] h-[200px] w-full flex flex-col items-center lg:justify-around justify-evenly text-white text-sm'>
      {/* first layer */}
      <div className='flex lg:px-6 px-4 lg:pt-2 items-center justify-between w-full '>
        <div className='flex items-center gap-2 '>
          <p className='font-extra'>Welcome to TenCowry!</p>
          <div className='flex items-center gap-1'>
            <Link className='text-[#ff5c40]' to='/login' >Login </Link>
            <span className=''>or</span>
            <Link className='text-[#ff5c40]' to='/register' >Register </Link>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Button className='text-small mui-btn' onClick={toggleSeller} sx={{ background: '#ff5c40', color: 'white', display: { xs: 'none', sm: 'flex' } }}>BECOME A SELLER</Button>
          <a className='lg:text-md font-light' href="/">₦ Naira</a>
          <a className='text-md font-light lg:block hidden' href="/">English</a>
        </div>
      </div>

      {/* second layer */}
      <div className='grid lg:grid-cols-3 grid-cols-2 w-full lg:px-8 px-4'>
        {/* logo */}
        <div className=' flex items-center justify-space-end'>
          <Link to='/'>
            <img className='h-[60px] cursor-pointer ' src={logo} alt="logo" />
          </Link>
        </div>
        {/* search bar */}
        <form onSubmit={handleSearch} className='lg:flex items-center justify-center hidden'>
          <input value={query} onChange={handleInputChange} className='border-0 p-3 w-full bg-white text-black rounded-l-lg  ' type="text" placeholder='enter full word e.g women not wom' />
          <IconButton className="searchBar" type='submit' sx={{ background: '#ff5c40', borderRadius: '0 8px 8px 0', padding: '10px' }}>
            <Search sx={{ color: 'white' }} />
          </IconButton>
          {loading && <p>Loading...</p>}
          {/* {error && <p>Error: {error}</p>} */}
        </form>
        {/* <div>
          {results.map(result => (
            <div key={result.id}>
              <h2>{result.product_name}</h2>
            </div>
          ))}
        </div> */}
        {/* cart */}
        <div className=' flex items-center justify-end'>
          <Link to='/Cart'>          
            <IconButton>
              <Badge badgeContent='0' color="error">
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>

      {/* third layer */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '50px' }}>
        <CssBaseline />
        <AppBar className='w-full px-2' sx={{ position: 'relative', background: 'none', boxShadow: 'none', width: '100%' }} component="nav">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton className='drawer-open-btn' color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' }, background: 'white' }}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <div>
              <div onClick={toggleDropdown} className='flex items-center gap-2 cursor-pointer p-2 bg-[#ff5c40] text-sm'>
                <MenuIcon />
                <p className='text-small'>ALL CATEGORIES</p>
                <ArrowDropDown />
              </div>
              {/* dropdown */}
              <div className="dropdown relative">
                <List className={open ? `hidden` : `block`} sx={{ width: '100%', position: 'absolute' }}>
                  <ListItem className="flex flex-col bg-white text-black rounded" disablePadding>
                    <ListItemButton className='drawer-item' sx={{ textAlign: 'center', justifyItems: 'center', display: 'flex', width: '100%', marginTop: '6px' }}>
                      <a href="/">Shopping</a>
                    </ListItemButton>
                    <ListItemButton className='drawer-item' sx={{ textAlign: 'center', justifyItems: 'center', display: 'flex', width: '100%', marginTop: '6px' }}>
                      <a href="/">Marketing</a>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </div>
            <Box className="gap-6 text-gray-300" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {NavItems.map((item) => (
                <Link className='nav-item' to={item.link} key={item.id}>{item.name}</Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav >
          <Drawer
            PaperProps={{
              sx: {
                backgroundColor: "#0000007b",
                color: 'white'
              }
            }}
            anchor={undefined}
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true, }}
            sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
            {drawer}
          </Drawer>
        </nav>
        {/* <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box> */}
      </Box>

      {/* Register Seller */}


      {seller && (
        <section className=' absolute top-40  w-full flex justify-center'>
          <RegisterSeller toggleSeller={toggleSeller} />
        </section>
      )}


    </div>
  )
}



export default Navbar