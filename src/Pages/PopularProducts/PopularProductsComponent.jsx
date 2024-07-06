import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Tabs, Tab, Skeleton, Button } from '@mui/material';
import { Favorite, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  indicator: {
    background: 'none'
  },
  tabs: {
    "& button[aria-selected='true']": {
      position: "relative",
      color: "#ff5c40"
    }
  }
});

const PopularProductsComponent = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);

  const categories = ['Fashion & Accessories', 'homeWares', 'Beauty & Personal Care', 'Electronics & Games', 'Sports', 'General Merchandise'];
  const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';

  const fetchDeals = async (category) => {
    setLoading(true);
    const url = `https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/popular/${category}?skip=0&limit=20`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiKey
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setDeals(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals(categories[value]);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(deals)) {
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div className='bg-[#f2f2f2] py-8 flex flex-col gap-4'>
      <div className='w-full lg:p-8'>
        <Tabs className={`${classes.tabs} overflow-x-scroll`} indicatorColor={""} classes={{ indicator: classes.indicator }} value={value} onChange={handleChange}>
          <Tab color='secondary' className='tab-button sm:text-xs' label="Fashion & Accessories" {...a11yProps(0)} />
          <Tab color='secondary' className='tab-button' label="Home Wares" {...a11yProps(1)} />
          <Tab color='secondary' className='tab-button' label="Beauty & Personal Care" {...a11yProps(2)} />
          <Tab color='secondary' className='tab-button' label="Electronic & Games" {...a11yProps(3)} />
          <Tab color='secondary' className='tab-button' label="Sports" {...a11yProps(4)} />
          <Tab color='secondary' className='tab-button' label="General Merchandise" {...a11yProps(5)} />
        </Tabs>
      </div>

      <CustomTabPanel value={value} index={0}>
        <section className='grid lg:grid-cols-3 2xl:grid-cols-4 w-full gap-4 lg:px-32'>
          {loading ? (
            deals.map((data) => (
              <div key={data.product_id} className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '20px 20px 0 0' }} height={200} />
                <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                  <Skeleton animation='wave' height={40} width={200} variant='text' />
                  <div className="flex items-center justify-between font-bold text-sm">
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                  </div>
                  <div className="w-full flex cursor-pointer items-center justify-end">
                    <Skeleton animation='wave' height={40} width={40} variant='rectangle' />
                  </div>
                </div>
              </div>
            ))
          ) : (
            deals.map((item) => (
              <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                <div className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture} alt={item.product_name} />
                  <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                  <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                    <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <p className="text-gray-500 line-through">₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}</p>
                      <p className="text-green-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}</p>
                      <p className="text-red-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}</p>
                    </div>
                    <div className="w-full flex cursor-pointer items-center justify-end">
                      <Button className='!text-white !w-full !bg-green-500 !normal-case'>Add To Cart</Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
      </CustomTabPanel>

      {/* Repeat CustomTabPanel for other categories with different index values */}
      <CustomTabPanel value={value} index={1}>
        <div className='grid lg:grid-cols-4 2xl:grid-cols-5 w-full gap-4'>
          {loading ? (
            deals.map((data) => (
              <div key={data.id} className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '20px 20px 0 0' }} height={200} />
                <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                  <Skeleton animation='wave' height={40} width={200} variant='text' />
                  <div className="flex items-center justify-between font-bold text-sm">
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                    <Skeleton animation='wave' height={10} width={100} variant='text' />
                  </div>
                  <div className="w-full flex cursor-pointer items-center justify-end">
                    <Skeleton animation='wave' height={40} width={40} variant='rectangle' />
                  </div>
                </div>
              </div>
            ))
          ) : (
            deals.map((item) => (
              <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                <div className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture} alt={item.product_name} />
                  <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                  <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                    <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <p className="text-gray-500 line-through">₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}</p>
                      <p className="text-green-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}</p>
                      <p className="text-red-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}</p>
                    </div>
                    <div className="w-full flex cursor-pointer items-center justify-end">
                      <Button className='!text-white !w-full !bg-green-500 !normal-case'>Add To Cart</Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </CustomTabPanel>

      {/* Add more CustomTabPanel components for other categories */}
    </div>
  );
}

export default PopularProductsComponent;
