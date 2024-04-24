import React from 'react'
import { useParams } from 'react-router-dom';

import placeholder from '../../Assets/images/home-placeholder.jpeg'

// components
import TopDealsData from '../../components/Data/TopDealsData';
import { Button } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Skeleton } from '@mui/material';
import { useState, useEffect } from "react";

const ItemDetails = () => {
  const { itemId } = useParams();
  const item = TopDealsData.find((item) => item.productCode === itemId);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [availableMaterials, setAvailableMaterials] = useState(item.quantity);

  // Skeleton animation='wave' loader 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 9000);
  });

  // if item does not exist
  if (!item) {
    return <div>Item not found bro</div>;
  }




  const handleIncrement = () => {
    if (count < availableMaterials) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className='grid lg:grid-cols-2 lg:p-12 p-4 mt-8 mb-16 gap-8'>
      <div className='px-4 border-2 border-gray-300 w-full p-2 flex flex-col items-center justify-center'>

        {/* main image */}
        <div className='h-full w-[400px] relative item-card'>
          {loading ? (
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} className='!h-full' />
          ) : (
            <>
              <div className='absolute h-full w-[400px] bg-[#00000068] cursor-pointer gap-2 rounded opacity-0 item-overlay flex items-center justify-center text-white'>
                <RemoveRedEyeOutlinedIcon className='!text-white' />
                <p>Preview</p>
              </div>
              <img src={item.image} alt={item.name} className=' h-full w-[400px] rounded object-cover' />
            </>
          )}
        </div>

        {/* other images */}
        {loading ? (
          <div className='flex items-center justify-center mt-4 gap-4'>
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
          </div>
        ) : (
          <div className='flex items-center justify-center mt-4 gap-4'>
            <img className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={placeholder} alt="" />
            <img className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={placeholder} alt="" />
            <img className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={placeholder} alt="" />
            <img className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={placeholder} alt="" />
          </div>
        )}
      </div>

      <div className=''>
        <div className='border-b border-gray-300 flex flex-col items-center lg:items-start lg:justify-start justify-center gap-4 p-5'>
          {loading ? (
            <>
              <Skeleton variant='text' className='!w-full !h-[30px]' />
              <Skeleton variant='text' className='!w-1/3' />
            </>
          ) : (
            <>
              <h1 className='lg:text-2xl text-gray-400'>{item.name}</h1>
              <p className='text-green-600 font-semibold'>{item.currentPrice}</p>
            </>
          )}

        </div>
        <div className='flex flex-col items-start w-full p-8 gap-2 text-sm'>
          <div className='flex items-center gap-4 w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <p>Product Variants</p>
                <div className='flex items-center gap-3'>
                  <div className='rounded h-[30px] w-[30px] bg-black flex items-center justify-center cursor-not-allowed p-1'> <ArrowBackIosIcon className='!text-white !text-sm' /> </div>
                  <span className='text-[#ff5c40]'>1</span>
                  <div className='rounded h-[30px] w-[30px] bg-black flex items-center justify-center cursor-not-allowed p-1'> <ArrowForwardIosIcon className='!text-white !text-sm' /> </div>
                </div>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Colour :</h1>
                <h1>N/A</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Size :</h1>
                <h1>N/A</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Stock Quantity :</h1>
                <h1>{item.quantity}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Brand :</h1>
                <h1>{item.Brand}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Product Code :</h1>
                <h1>{item.productCode}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold pb-8 w-full'>
            {/* <h1> Quantity </h1>
            <div className='flex items-center gap-3'>
              <div onClick={handleDecrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> - </div>
              <span className=''> {count} </span>
              <div onClick={handleIncrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> + </div>
            </div> */}
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1> Quantity </h1>
                <div className='flex items-center gap-3'>
                  <div onClick={handleDecrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> - </div>
                  <span className=''> {count} </span>
                  <div onClick={handleIncrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> + </div>
                </div>
              </>
            )}
          </div>


          <div className='flex flex-col items-start gap-4 py-4 justify-between h-[150px] border-t border-b border-gray-300 w-full'>
            <div className='flex items-center gap-4 w-full'>
              { loading ? (
                <Skeleton variant='text' className='!w-full !h-[30px]' />
              ) : (
                <>                
                  <h1>Product Description :</h1>
                  <h1 className='text-gray-600 font-bold '>NOUEZ MOI TRAVEL SPRAY + 3 RIC.10ML</h1>
                </>
              ) }
            </div>
            { loading ? (
              <Skeleton variant='text' className='!w-full !h-[30px]' />
            ) : (
              <Button className='!text-white !w-full !bg-green-500 !normal-case' >Add To Cart</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails