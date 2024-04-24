import React, { useRef, useState } from 'react';

// swiper images
import slider1 from '../Assets/images/slider-1.webp'
import slider2 from '../Assets/images/slide-2.webp'
import slider3 from '../Assets/images/slide-3.webp'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

// mui
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DiscountIcon from '@mui/icons-material/Discount';


const Banner = () => {
  return (
    <div >
      {/* slider */}
      <Swiper pagination={{ clickable: true, dot: true }} loop={true} autoplay={true} modules={[Pagination,Autoplay ]} spaceBetween={20} className="mySwiper w-full lg:h-[80vh] h-[200px] m-2 mx-8">
        <SwiperSlide>
          <img className='h-full w-full object-cover' src={slider1} alt="slider-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover' src={slider2} alt="slider-2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover' src={slider3} alt="slider-3" />
        </SwiperSlide>
      </Swiper>


      {/*  */}
      <div className='lg:grid hidden lg:grid-cols-4 gap-8 items-start m-4 border-2 border-gray-300 lg:px-14 lg:p-10 p-6 '>
        <div className='w-full flex items-center  justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <AirportShuttleIcon sx={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] ease cursor-pointer'>AFFORDABLE DELIVERY</h1>
            <p className='text-gray-400 text-sm'>From ₦2000 </p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <SupportAgentIcon sx={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>SUPPORT 24/7</h1>
            <p className='text-gray-400 text-sm'>Online 24 Hours</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <CreditCardIcon sx={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>PAYMENT METHOD</h1>
            <p className='text-gray-400 text-sm'>Secure Payment</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 '>
          <div>
            <DiscountIcon sx={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>BIG DISCOUNT</h1>
            <p className='text-gray-400 text-sm'>Every Weekend</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner