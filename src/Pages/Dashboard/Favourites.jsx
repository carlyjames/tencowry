import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

// components
import { Navbar, Footer } from '../../components'
import { Skeleton, Button } from '@mui/material';


const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoading(false);
  }, []);
  console.log(favorites);
  return (
    <div className='bg-[#f2f2f2]'>
      <Navbar />
      <h1 className='text-center lg:text-4xl m-4'>My Favorites</h1>
      <section className=' grid lg:grid-cols-3 2xl:grid-cols-4 w-full gap-4 lg:px-32'>
              {loading ? (
                favorites.map((data) => (
                  <div key={data.product_id} className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
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
                ))
              ) : (
                favorites.map((item) => (
                  <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                    <div className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                      <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture} alt={item.product_name} />
                      <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                        <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                        <div className="flex items-center justify-between font-bold text-sm">
                          <p className="text-gray-500 line-through">₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}</p>
                          <p className="text-green-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}</p>
                          <p className="text-red-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}</p>
                        </div>
                        <div className="w-full flex cursor-pointer items-center justify-end">
                          <Button className='!text-white !w-full !bg-green-500 !normal-case'>Add To Cart</Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </section>

      <Footer />
    </div>
  )
}

export default Favourites