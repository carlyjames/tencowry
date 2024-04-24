import React from 'react'

// components
import { Banner, Featured, TopDeals, NewArrivals, PopularProducts, Newsletter, Footer } from './'

const Home = () => {
  return (
    <div>
      <div className='lg:mx-4 '>
        <Banner />
        <Featured />
        <TopDeals />
        <NewArrivals />
        <PopularProducts />
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home