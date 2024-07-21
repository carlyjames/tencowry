import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import { CartContext } from '../Pages/ItemDetails/ItemDetails';

// images
import ad1 from '../Assets/images/TopDeals/id3-banner2.jpg';
import ad2 from '../Assets/images/TopDeals/id3-banner3.jpg';

// mui
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Skeleton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Swal from 'sweetalert2';


// Placeholder image
import placeholderImage from '../Assets/images/home-placeholder.jpeg';

const TopDeals = () => {
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const { openDialog } = useContext(CartContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
      const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/topdeals?skip=2&limit=20';

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
        console.log(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (product) => {
    let updatedFavorites;
    const existingIndex = favorites.findIndex(fav => fav.product_id === product.product_id);
    if (existingIndex !== -1) {
      updatedFavorites = [...favorites];
      updatedFavorites.splice(existingIndex, 1);
    } else {
      updatedFavorites = [...favorites, { ...product }];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log(updatedFavorites);
    Swal.fire({
      title: 'Item added to Favourites',
      icon: 'success',
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

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

      {loading || error || !Array.isArray(deals) ? (
        <div className="grid lg:grid-cols-4  m-4 gap-4">
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
          <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={280} />
        </div>
      ) : (
        <div>
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
              <SwiperSlide key={item.product_id} className="swiperItem relative max-h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150">
                <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                  <img
                    className="h-[200px] w-full object-cover rounded-t-lg"
                    src={item.main_picture && item.main_picture.trim() ? item.main_picture : placeholderImage}
                    alt={item.product_name || 'No image available'}
                  />
                </Link>
                <Favorite
                  titleAccess="Add to Favorites"
                  className={`FavoriteIcon text-sm absolute top-2 right-2 ${favorites.some(fav => fav.product_id === item.product_id) ? 'text-black' : 'text-gray-400'} hover:text-black`}
                  onClick={() => toggleFavorite(item)}
                />
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
                  <div onClick={() => openDialog(item)} className="w-full flex cursor-pointer items-center justify-end">
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
        </div>
      )}

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
  );
}

export default TopDeals;
