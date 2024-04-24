import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// pages
import { TopDeals, PopularProducts, NewArrivals, Item } from './Pages';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/top-deals" element={<TopDeals />}/>
        <Route path="/popular-products" element={<PopularProducts />}/>
        <Route path="/new-arrivals" element={<NewArrivals />}/>

        {/* item details */}
        <Route path="/item/:itemId" element={<Item />}/>

      </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);