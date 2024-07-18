import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// images
import img1 from '../Assets/images/Icons/new.png'

// mui
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Favorite } from "@mui/icons-material";
import { Skeleton } from "@mui/material";



// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import TopDealsData from './Data/TopDealsData'


const NewArrivals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
      const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/newarrival?skip=0&limit=20';

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

        // Assuming the deals data is in `data.data` if the API response is structured like: { status: true, message: "success", data: [...] }
        setDeals(data.data || []);
        console.log(deals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!Array.isArray(deals)) {
  //   return <div>Error: Invalid data format</div>;
  // }

  return (
    <div className="px-4 mt-12 mb-24 w-full pb-8">
      <div className='w-full flex items-center justify-between border-b-2 border-gray-300'>
        <div className="relative flex items-center gap-2 lg:text-2xl text-xl  ">
          <img src={img1} className='lg:h-[50px] h-[40px]' alt="new-icon" />
          <h1 className="border-b-2 border-[#ff5c40]">New Arrivals</h1>
        </div>

        <div className='flex items-center text-[#ff5c40] font-medium'>
          <Link to={'/new-arrivals'}>
            View all <ArrowRightIcon className='text-black' />
            {/* <a href="/">View all  </a> */}
          </Link>
        </div>
      </div>

      {loading || error || !Array.isArray(deals) ? (
        <div className="grid lg:grid-cols-4 m-4 gap-4">
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
        </div>
      ) : (
        <div>
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
            {deals.map((item) => (
              <SwiperSlide key={item.product_id} className="swiperItem max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" >
                <Link to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture} alt={item.product_name} />
                  <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                  <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                    <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <p className="text-gray-500 line-through">
                        ₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}
                      </p>
                      <p className="text-green-400">
                        ₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}
                      </p>
                      <p className="text-red-400">
                        ₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}




    </div>
  )
}

export default NewArrivals