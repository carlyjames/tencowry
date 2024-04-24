import React from 'react'
import { Link } from 'react-router-dom'
// images
import img1 from '../Assets/images/Icons/new.png'

// mui
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Favorite } from "@mui/icons-material";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import TopDealsData from './Data/TopDealsData'


const NewArrivals = () => {
  return (
    <div className="px-4 mt-12 mb-24 w-full pb-8">
      <div className='w-full flex items-center justify-between border-b-2 border-gray-300'>
        <div className="relative flex items-center gap-2 lg:text-2xl text-xl  ">
          <img src={img1} className='lg:h-[50px] h-[40px]' alt="new-icon" />
          <h1 className="border-b-2 border-[#ff5c40]">New Arrivals</h1>
        </div>

        <div className='flex items-center text-[#ff5c40] font-medium'>
          <a href="/">View all <ArrowRightIcon className='text-black' /> </a>
        </div>
      </div>

      {/* swiper */}
      <>
        <Swiper
          // slidesPerView={5}
          spaceBetween={20}
          loop={true}
          direction='horizontal'
          speed={3000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 5, spaceBetween: 20 }
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper relative  mt-8 w-full p-4"
        >
          {TopDealsData.map((item) => (
            <SwiperSlide className="swiperItem max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
              <Link to={`/item/${item.productCode}`}>
                <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.image} alt={item.name} />
                <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                  <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.name}</h1>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <p className="text-gray-500 line-through">{item.formerPrice}</p>
                    <p className="text-green-400">{item.currentPrice}</p>
                    <p className="text-red-400">{item.discountRate}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </>



    </div>
  )
}

export default NewArrivals