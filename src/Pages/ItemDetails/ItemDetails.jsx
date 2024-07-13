import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../../Assets/images/home-placeholder.jpeg';
import { Button, Skeleton } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Swal from 'sweetalert2';

// Context to manage the global cart state
const CartContext = React.createContext();

const ItemDetails = () => {
  const { idl_product_code, supplier_id } = useParams();
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authTokens");
  const { cart, setCart } = useContext(CartContext);
  let email = '';

  if (token) {
    try {
      const parsedToken = JSON.parse(token);
      email = parsedToken.data.email;
    } catch (error) {
      console.error("Error parsing token:", error.message);
    }
  }

  useEffect(() => {
    const fetchItemDetails = async () => {
      const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
      const url = `https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/detail/${idl_product_code}/${supplier_id}`;

      try {
        setLoading(true);
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
        setLoading(false);
        setItem(data.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [idl_product_code, supplier_id]);

  const AddToCart = async () => {
    const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
    const url = `https://tencowry-api-staging.onrender.com/api/v1/ecommerce/cart/record/${email}`;

    if (!item || !item.product_variants || !item.product_variants[0]) {
      console.error('Item or product variants are missing');
      return;
    }

    const {
      product_id,
      category,
      sub_category,
      main_picture,
      product_variants,
      currency,
      currency_adder,
      exchange_rate,
    } = item;

    const {
      product_rrp_naira: naira_price,
      product_cost,
      size,
      colour,
      weight,
      product_sku,
    } = product_variants[0];

    const payload = {
      idl_product_code,
      supplier_id: supplier_id,
      product_sku: product_sku,
      product_id,
      product_name: item.product_name,
      category,
      sub_category,
      main_picture,
      quantity: 1, 
      naira_price, 
      product_cost, 
      currency,
      currency_adder,
      colour,
      exchange_rate,
      weight,
    };

    // Check if the item is already in the cart
    const itemInCart = cart.find(cartItem => cartItem.product_sku === product_sku);
    if (itemInCart) {
      Swal.fire({
        title: 'Item in cart already',
        icon: 'warning',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiKey
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      Swal.fire({
        title: 'Item added to cart',
        icon: 'success',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      console.log('Item added to cart:', data);

      // Update local storage and context state
      const newCart = [...cart, payload];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  if (!item && !loading) {
    return <div>Item not found</div>;
  }
  const handleIncrement = () => {
    if (item && item.product_variants && count < item.product_variants[0].stock_quantity) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  console.log(item && item.product_variants[0].color );
  console.log(item );

  return (
    <div className='grid lg:grid-cols-2 lg:p-12 p-4 mt-8 mb-16 gap-8'>
      <div className='px-4 border-2 border-gray-300 w-full p-2 flex flex-col items-center justify-center'>
        <div className='h-full lg:w-[400px] relative item-card'>
          {loading ? (
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={300} />
          ) : (
            <>
              <div className='absolute h-full lg:w-[400px] w-full bg-[#00000068] cursor-pointer gap-2 rounded opacity-0 item-overlay flex items-center justify-center text-white'>
                <RemoveRedEyeOutlinedIcon className='!text-white' />
                <p>Preview</p>
              </div>
              <img src={item.main_picture} alt={item.product_name} className='h-full w-[400px] rounded object-cover' />
            </>
          )}
        </div>

        {loading ? (
          <div className='flex items-center justify-center mt-4 gap-4'>
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
          </div>
        ) : (
          <div className='flex items-center justify-center mt-4 gap-4 w-full overflow-x-scroll'>
            {item.other_pictures && item.other_pictures.map((pic, index) => (
              <img key={index} className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={pic} alt="" />
            ))}
          </div>
        )}
      </div>

      <div className=''>
        <div className='border-b border-gray-300 flex flex-col items-center lg:items-start lg:justify-start justify-center gap-4 p-5'>
          {loading ? (
            <>
              <Skeleton variant='text' className='!w-full !h-[30px]' />
              <Skeleton variant='text' className='!w-1/3' />
            </>
          ) : (
            <>
              <h1 className='lg:text-3xl text-2xl text-gray-400'>{item.category}</h1>
              <p className='text-green-600 font-semibold text-2xl'>₦{item.product_variants[0].product_rrp_naira}</p>
            </>
          )}
        </div>
        <div className='flex flex-col items-start w-full p-8 gap-2 text-sm'>
          <div className='flex items-center gap-4 w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <p>Product Variants</p>
                <div className='flex items-center gap-3'>
                  <div className='rounded h-[30px] w-[30px] bg-black flex items-center justify-center cursor-not-allowed p-1'> <ArrowBackIosIcon className='!text-white !text-sm' /> </div>
                  <span className='text-[#ff5c40]'>1</span>
                  <div className='rounded h-[30px] w-[30px] bg-black flex items-center justify-center cursor-not-allowed p-1'> <ArrowForwardIosIcon className='!text-white !text-sm' /> </div>
                </div>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Colour :</h1>
                <h1 className='text-gray-400'>{item.product_variants[0].color}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Size :</h1>
                <h1 className='text-gray-400'>N/A</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Weight :</h1>
                <h1 className='text-gray-400'>{item.product_variants[0].weight}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Brand :</h1>
                <h1 className='text-gray-400'>{item.product_variants[0].brand}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Description :</h1>
                <h1 className='text-gray-400'>{item.description}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Made in :</h1>
                <h1 className='text-gray-400'>{item.made_in}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Material :</h1>
                <h1 className='text-gray-400'>{item.material}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Stock Quantity :</h1>
                <h1 className='text-gray-400'>{item.product_variants[0].stock_quantity}</h1>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center gap-4 w-full p-8'>
          <Button variant="contained" color="primary" onClick={handleDecrement} disabled={count <= 0}>-</Button>
          <span>{count}</span>
          <Button variant="contained" color="primary" onClick={handleIncrement} disabled={item && count >= item.product_variants[0].stock_quantity}>+</Button>
        </div>
        <div className='flex items-center gap-4 w-full p-8'>
          <Button variant="contained" color="primary" onClick={AddToCart} disabled={count === 0 || loading}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};
  
// CartProvider component to wrap the application and provide cart context
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
export default ItemDetails;
