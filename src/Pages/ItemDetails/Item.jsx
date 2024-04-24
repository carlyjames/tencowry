import React from 'react'

// components
import { Navbar, Footer, RecentlyViewed } from '../../components'
import ItemDetails from './ItemDetails'

const Item = () => {
  return (
    <div className='bg-[#f2f2f2]'>
        <Navbar />
        <ItemDetails />
        <RecentlyViewed />
        <Footer />
    </div>
  )
}

export default Item