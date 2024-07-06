import React from 'react'

// components
import { Navbar, Footer } from '../../components'
import PopularProductsComponent from './PopularProductsComponent'


const PopularProducts = () => {
  return (
    <div>
        <Navbar />
        <h1 className='text-center text-xl lg:text-2xl bg-[#f2f2f2] w-full pt-4'>Popular Products</h1>
        <PopularProductsComponent />
        <Footer />
    </div>
  )
}

export default PopularProducts