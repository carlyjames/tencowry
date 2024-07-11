import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";

// images
import ad1 from '../Assets/images/TopDeals/id3-banner2.jpg';
import ad2 from '../Assets/images/TopDeals/id3-banner3.jpg';

// mui
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Placeholder image
import placeholderImage from '../Assets/images/home-placeholder.jpeg'

const TopDeals = () => {
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    const fetchDeals = async () => {
      const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
      const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/topdeals?skip=0&limit=20';

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
        console.log(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(deals)) {
    return <div>Error: Invalid data format</div>;
  }

  const handleOpenPopUp = (product) => {
    setSelectedProduct(product);
    setPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setSelectedProduct(null);
    setPopUpOpen(false);
  };

  return (
    <div className="mt-12 mb-24 w-full pb-8">
      <div className="flex items-center gap-2 lg:text-2xl text-xl border-b-2 border-gray-300">
        <FlashOnIcon sx={{ color: '#ff5c40' }} />
        <h1 className="border-b-2 border-[#ff5c40]">Top Deals</h1>
      </div>

      {/* swiper */}
      <>
        <Swiper
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
          className="mySwiper relative mt-2 w-full p-4 px-4"
        >
          {deals.map((item) => (
            <SwiperSlide className="swiperItem relative max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
              <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                <img
                  className="h-[200px] w-full object-cover rounded-t-lg"
                  src={item.main_picture ? item.main_picture : placeholderImage}
                  alt={item.product_name}
                />
              </Link>
              <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
              <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                <div className="flex items-center justify-between font-bold text-sm">
                  <p className="text-gray-500 line-through">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}
                  </p>
                  <p className="text-green-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}
                  </p>
                  <p className="text-red-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}
                  </p>
                </div>
                <div onClick={() => handleOpenPopUp(item)}  className="w-full flex cursor-pointer items-center justify-end">
                  <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                    <ShoppingCartIcon className="cart-icon" />
                  </div>
                </div>
              </div>
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

      {popUpOpen && (
        <PopUp
          product={selectedProduct}
          handleClosePopUp={handleClosePopUp}
        />
      )}
    </div>
  )
}

export default TopDeals;
