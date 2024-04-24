import React from "react";

// mui
import CategoryIcon from '@mui/icons-material/Category'


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Category from './Data/Categories'

const Featured = () => {
  return (
    <div className="px-4 mt-12 mb-18 w-full pb-8">
      <div className="flex items-center gap-2 lg:text-2xl text-xl border-b-2 border-gray-300">
        <CategoryIcon sx={{ color: '#ff5c40' }} />
        <h1 className="border-b-2 border-[#ff5c40] font-medium">Featured Categories</h1>
      </div>
      <>      
        <Swiper
          // slidesPerView={4}
          spaceBetween={20}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 5, spaceBetween: 20 }

          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper relative  mt-2 w-full p-4 px-4"
        >
          {Category.map((item) => (
            <SwiperSlide key={item.id} className="bg-white shadow shadow-xl p-2 rounded-lg mb-2">
              <div className="flex items-center justify-between w-full absolute z-10">
                <div className="rounded-full bg-[#0f3460] px-2 py-1 text-xs text-white">{item.name}</div>
                <div className="rounded-full bg-[#f0f8ff] px-2 py-1 text-xs text-black transform -translate-x-[15px]">{item.orders}</div>
              </div>
              <img className="rounded-lg relative" src={item.image} alt="" />

            </SwiperSlide>
          ))}
        </Swiper>
      </>

    </div>
  )
}

export default Featured