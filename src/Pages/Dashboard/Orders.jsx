import React, { useState } from 'react'

import { Navbar, Footer } from '../../components'
import { Box, Tabs, Tab, Skeleton, Button } from '@mui/material';
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
        <Box >
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

const Orders = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-[#f2f2f2]'>
      <Navbar />
      <section className='w-full flex items-center justify-center my-8'>
        <div className='bg-white lg:p-4 p-2 lg:w-[80%] w-[100%]'>
          <h1 className='text-center lg:text-3xl'>Your Orders</h1>
          <div className='w-full lg:p-8'>
            <Tabs className={`${classes.tabs} overflow-x-scroll`} indicatorColor={""} classes={{ indicator: classes.indicator }} value={value} onChange={handleChange}>
              <Tab color='secondary' className='tab-button-2 sm:text-xs' label="View Orders" {...a11yProps(0)} />
              <Tab color='secondary' className='tab-button-2' label="Track Orders" {...a11yProps(1)} />
              <Tab color='secondary' className='tab-button-2' label="Returns" {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <div className='flex flex-col items-center gap-4 bg-white'>
                <h1 className='my-2 text-gray-700 text-center'>View Orders</h1>
                <div className='w-full relative overflow-x-auto'>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-md text-gray-700  bg-slate-50 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                          Silver
                        </td>
                        <td class="px-6 py-4">
                          Laptop
                        </td>
                        <td class="px-6 py-4">
                          $2999
                        </td>
                        <td class="px-6 py-4">
                          <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className=' p-6 flex flex-col items-center gap-4 bg-white w-full '>
                <h1 className='text-gray-700  text-center'>Track Orders</h1>
                <div className='w-full mt-5 flex  items-center justify-center  gap-2'>
                  <label htmlFor='order_id' className='flex gap-1  font-semibold'><span className='text-red-400'>*</span>Order ID : </label>
                  <input id='order_id' placeholder='enter order ID to track' name='order_id' className='lg:w-2/3 border border-gray-400 p-1 rounded-md hover:border-blue-400' type='text' />
                </div>
                <button className='py-2 px-4 rounded-md bg-slate-800 text-white'>Track</button>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className=' p-6 flex flex-col items-center gap-4 bg-white w-full '>
                <h1 className='text-gray-700  text-center'>Returns</h1>
                <div className='w-full relative overflow-x-auto'>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-md text-gray-700  bg-slate-50 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                          Silver
                        </td>
                        <td class="px-6 py-4">
                          Laptop
                        </td>
                        <td class="px-6 py-4">
                          $2999
                        </td>
                        <td class="px-6 py-4">
                          <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CustomTabPanel>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Orders