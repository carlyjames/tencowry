import React from 'react'
import { Link } from 'react-router-dom';

import TopDealsData from '../../components/Data/TopDealsData'

// mui
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Favorite } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Skeleton } from '@mui/material';
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

const TopDealsComponent = () => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Skeleton animation='wave' loader 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 9000);
  });

  const classes = useStyles();

  // filter according to tags
  const fashiontag = TopDealsData.filter(item => item.tag === 'fashion');
  const beautytag = TopDealsData.filter(item => item.tag === 'beauty');


  return (
    <div className='bg-[#f2f2f2] py-8 flex flex-col gap-4'>

      <div className='w-full lg:p-8'>
        <Tabs className={classes.tabs} indicatorColor={""} classes={{ indicator: classes.indicator }} value={value} onChange={handleChange} >
          <Tab color='secondary' className='tab-button sm:text-xs' label="Fashion & Accessories" {...a11yProps(0)} />
          <Tab color='secondary' className='tab-button' label="Beauty & Personal Care" {...a11yProps(1)} />
        </Tabs>
      </div>

      <CustomTabPanel value={value} index={0}>
        <section className='grid lg:grid-cols-4 2xl:grid-cols-5 w-full gap-4'>
          {loading ? (
            // if loading
            <>
              {fashiontag.map((data, ind) => (
                <div key={data.id} className=' rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
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
              ))}
            </>
          ) : (
            // after loading
            <>
              {fashiontag.map((data, ind) => (
                <Link to={`/item/${data.productCode}`} key={data.id}>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={data.image} alt={data.name} />
                  <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                  <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                    <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{data.name}</h1>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <p className="text-gray-500 line-through">{data.formerPrice}</p>
                      <p className="text-green-400">{data.currentPrice}</p>
                      <p className="text-red-400">{data.discountRate}</p>
                    </div>
                    <Link to={`/item/${data.productCode}`}>                    
                      <div className="w-full flex cursor-pointer items-center justify-end">
                        <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                          <ShoppingCartIcon className="cart-icon" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </Link>
              ))}
            </>
          )}
        </section>
      </CustomTabPanel>



      <CustomTabPanel value={value} index={1}>
        <div className='grid lg:grid-cols-4 2xl:grid-cols-5 w-full gap-4'>
          {loading ? (
            // if loading
            <>
              {beautytag.map((data, ind) => (
                <div key={data.id} className=' rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                  <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '20px 20px 0 0' }} height={200} />
                  {/* <div className="h-[60%] bg rounded-t-[20px]" style={{ backgroundImage: `url(${data.image}) ` }}></div> */}
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
              ))}
            </>
          ) : (
            // after loading
            <>
              {beautytag.map((data, ind) => (
                <Link to={`/item/${data.productCode}`} key={data.id}>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={data.image} alt={data.name} />
                  <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                  <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                    <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{data.name}</h1>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <p className="text-gray-500 line-through">{data.formerPrice}</p>
                      <p className="text-green-400">{data.currentPrice}</p>
                      <p className="text-red-400">{data.discountRate}</p>
                    </div>
                    <Link to={`/item/${data.productCode}`} className="w-full flex cursor-pointer items-center justify-end">
                      <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                        <ShoppingCartIcon className="cart-icon" />
                      </div>
                    </Link>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </CustomTabPanel>



    </div>
  )
}

export default TopDealsComponent