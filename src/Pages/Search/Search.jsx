import React, { useContext } from 'react'
import { useLocation, Link, useSearchParams } from 'react-router-dom'
import { Navbar, Footer } from '../../components';
import { Box, Tabs, Tab, Skeleton, Button } from '@mui/material';
import { Favorite, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { CartContext } from '../ItemDetails/ItemDetails';

const Search = () => {
  const location = useLocation();
  const { results, loading } = location.state;
  const { openDialog } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className='bg-[#f2f2f2]'>
      <Navbar />
      <div className='lg:p-4 p-2'>
        <h1 className='lg:text-2xl font-semibold text-gray-400'>Search Results for: <span className='text-[#ff5c40]'>{query}</span></h1>
      </div>
        {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <section className='grid lg:grid-cols-3 2xl:grid-cols-4 w-full gap-4 lg:px-32'>
          {loading ? (
            results.map((data) => (
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
            results.map((item) => (
              <div key={results.product_idl} className='rounded-[20px] h-[400px] lg:w-full w-[300px] mt-4'>
                <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
                  <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture || 'hello'} alt={item.product_name} />
                </Link>
                <Favorite titleAccess="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
                <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                  <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <p className="text-gray-500 line-through">₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}</p>
                    <p className="text-green-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}</p>
                    <p className="text-red-400">₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}</p>
                  </div>
                  <div onClick={() => openDialog(item)} className="w-full flex cursor-pointer items-center justify-end">
                    <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                      <ShoppingCartIcon className="cart-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Search