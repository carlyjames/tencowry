import React from 'react'

// components
import { Navbar, Footer } from '../../components'
import TopDealsComponent from './TopDealsComponent'

const TopDeals = () => {
  return (
    <section>
        <Navbar />
        <h1 className='text-center text-xl lg:text-2xl bg-[#f2f2f2] w-full pt-4'>Top Deals Products</h1>
        <TopDealsComponent />
        <Footer />
    </section>
  )
}

export default TopDeals