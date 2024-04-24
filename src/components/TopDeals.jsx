import React from "react";
import { Link } from "react-router-dom";
// images
import ad1 from '../Assets/images/TopDeals/id3-banner2.jpg'
import ad2 from '../Assets/images/TopDeals/id3-banner3.jpg'

// mui
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import TopDealsData from './Data/TopDealsData'


const TopDeals = () => {
  return (
    <div className=" mt-12 mb-24 w-full pb-8">
      <div className="flex items-center gap-2 lg:text-2xl text-xl border-b-2 border-gray-300">
        <FlashOnIcon sx={{ color: '#ff5c40' }} />
        <h1 className="border-b-2 border-[#ff5c40]">Top Deals</h1>
      </div>

      {/* swiper */}
      <>
        <Swiper
          // slidesPerView={5}
          spaceBetween={20}
          loop={true}
          direction='horizontal'
          speed={2000}
          autoplay={false}
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
          className="mySwiper relative  mt-2 w-full p-4 px-4"
        >
          {TopDealsData.map((item) => (
            <SwiperSlide className="swiperItem relative max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
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
                  <Link to={`/item/${item.productCode}`}>
                    <div className="w-full flex cursor-pointer items-center justify-end">
                      <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                        <ShoppingCartIcon className="cart-icon" />
                      </div>
                    </div>
                  </Link>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="">
            <div className="swiper-button-prev h-[50px] rounded-full w-[50px] bg-[#0f3460] hover:bg-[#ff5c40] transition ease-in delay-150">
              <ArrowLeftIcon sx={{ color: 'white' }} />
            </div>
            <div className="swiper-button-next h-[50px] rounded-full w-[50px] bg-[#0f3460] hover:bg-[#ff5c40] transition ease-in delay-150">
              <ArrowRightIcon sx={{ color: 'white' }} />
            </div>
          </div>

        </Swiper>
      </>

      {/* AD */}
      <div className="mt-12 w-full flex lg:flex-row flex-col items-center justify-center lg:gap-8 gap-4">
        <img src={ad1} className="cursor-pointer " alt="top collection" />
        <img src={ad2} className="cursor-pointer " alt="top-collection" />
      </div>

    </div>
  )
}

export default TopDeals