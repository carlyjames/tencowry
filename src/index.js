import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Authentication
import { Register, Login } from './components'
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Utils/PrivateRoute'
import { CartProvider } from './Pages/ItemDetails/ItemDetails'

// pages
import { TopDeals, PopularProducts, NewArrivals, Item, Cart, Profile, Orders, Favourites, Checkout, Confirmation } from './Pages'

import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/top-deals' element={<TopDeals />} />
            <Route path='/popular-products' element={<PopularProducts />} />
            <Route path='/new-arrivals' element={<NewArrivals />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/my-account' element={<Profile />} />
            <Route path='/my-orders' element={<Orders />} />
            <Route path='/my-favorites' element={<Favourites />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/confirmation' element={<Confirmation />} />

            {/* item details */}
            <Route path='/product/detail/:idl_product_code/:supplier_id' element={<Item />} />
          </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
