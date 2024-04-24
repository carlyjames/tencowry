import React from 'react'

// components
import { Navbar, Footer } from '../../components'
import TopDealsComponent from '../TopDeals/TopDealsComponent'

const PopularProducts = () => {
  return (
    <div>
        <Navbar />
        <h1 className='text-center text-xl lg:text-2xl bg-[#f2f2f2] w-full pt-4'>Popular Products</h1>
        <TopDealsComponent />
        <Footer />
    </div>
  )
}

export default PopularProducts