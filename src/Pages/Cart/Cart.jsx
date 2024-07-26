import React, { useState, useContext } from 'react';
import { Navbar, Footer } from '../../components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import placeholderImage from '../../Assets/images/home-placeholder.jpeg';
import { Cancel } from '@mui/icons-material';
import { CartContext } from '../ItemDetails/ItemDetails';
import cartIcon from '../../Assets/images/vecteezy_shopping-cart-icon-on-a-white-background_4879563.jpg';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const [deletedItem, setDeletedItem] = useState(null);

    const toggleDelete = (item) => {
        setDeletedItem(item);
    };

    const deleteItemFromCart = (item) => {
        Swal.fire({
            title: 'Item deleted from cart',
            icon: 'success',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });

        // Update local storage and context state
        const updatedCart = cart.filter((cartItem) => cartItem.product_sku !== item.product_sku);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setDeletedItem(null);
    };

    const CreateOrder = async () => {
        const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
        const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/generate/ordersummary';
        const products = cart.map(({ product_name, idl_product_code, product_sku, product_id, category, sub_category, main_picture, supplier_id, quantity, naira_price, product_cost, currency, currency_adder, exchange_rate, size, colour, weight, brand, description, made_in, material }) => ({
            product_name,
            idl_product_code,
            product_sku,
            product_id,
            category,
            sub_category,
            main_picture,
            supplier_id,
            quantity,
            naira_price,
            product_cost,
            currency,
            currency_adder,
            exchange_rate,
            size,
            colour,
            weight,
            brand,
            description,
            made_in,
            material
        }));
        console.log(JSON.stringify({ products }));

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': apiKey
                },
                body: JSON.stringify({ products })
            });

            const data = await response.json();

            if (response.ok && data.status) {

                try {
                    Swal.fire({
                        title: 'Order generated successfully',
                        icon: 'success',
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    localStorage.setItem('order', JSON.stringify(data));
                    navigate('/checkout');
                    console.log(data);
                } catch (error) {
                    console.error('Invalid token:', error);
                    Swal.fire({
                        title: 'Invalid Token',
                        icon: 'error',
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    return;
                }

            } else {
                Swal.fire({
                    title: 'Incorrect order',
                    icon: 'error',
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error occurred during creating order:', error);
            Swal.fire({
                title: 'An Error Occurred',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }

    const totalAmount = cart.reduce((acc, item) => acc + (item.naira_price * item.quantity), 0);

    return (
        <div>
            <section className='relative'>
                <Navbar />

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <img src={cartIcon} alt="Empty Cart" className="w-48 h-48 mb-4" />
                        <h1 className="text-2xl text-gray-500">Your cart is empty</h1>
                        <Link to='/' className='mt-4 p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='bg-[#f2f2f2] p-4'>
                        {/* header */}
                        <div className='w-full p-3 flex items-center justify-between mb-2'>
                            <h1 className='text-gray-500 lg:text-3xl'>Shopping Cart</h1>
                            <Link to='/' className='p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
                                Continue Shopping
                            </Link>
                        </div>
                        <hr />

                        <div className='flex lg:flex-row flex-col w-full items-start mt-8 gap-4 lg:gap-32'>
                            {/* order details */}
                            <div className='lg:w-2/3  flex flex-col '>
                                {cart.map((item) => (
                                    <div
                                        key={item.product_sku}
                                        className='w-full bg-white text-sm shadow-xl gap-2 h-max lg:h-[200px] mb-8 rounded-md p-6 flex flex-col items-start justify-between'
                                    >
                                        <div className='w-full flex lg:flex-row md:flex-col flex-col justify-between items-start gap-4 lg:gap-8'>
                                            <img
                                                className='h-[100px] w-[100px] object-cover'
                                                src={item.main_picture ? item.main_picture : placeholderImage}
                                                alt={item.product_name || 'No image available'}
                                            />
                                            {/* product details */}
                                            <div className='flex flex-col gap-3 items-start'>
                                                <h1 className='text-gray-500'>{item.product_name}</h1>
                                                <>
                                                    <div className='flex gap-2'>
                                                        <p className='font-bold'>Color:</p>
                                                        <p>{item.colour || 'N/A'}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <p className='font-bold'>Size:</p>
                                                        <p className='text-[#ff5c40] font-semibold'>
                                                            {item?.size || 'N/A'}
                                                        </p>
                                                    </div>
                                                </>
                                            </div>
                                            {/* product quantity */}
                                            <div className='flex flex-col gap-3 items-start'>
                                                <div className='flex gap-4 items-center'>
                                                    <div className='flex gap-2'>
                                                        <p className='font-bold'>Quantity:</p>
                                                        <p className='text-green-500 font-semibold italic'>X {item.quantity}</p>
                                                    </div>
                                                    {/* <div className='flex items-center gap-2'>
                                                        <div onClick={() => handleDecrement(item)} className='flex items-center justify-center bg-slate-300 cursor-pointer'>
                                                            <RemoveIcon />
                                                        </div>
                                                        <div onClick={() => handleIncrement(item)} className='flex items-center justify-center border-gray-400 border cursor-pointer'>
                                                            <AddIcon sx={{ color: '#ff5c40' }} />
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>Price:</p>
                                                    <p className='text-[#ff5c40]'>₦{item.naira_price}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* delete api */}
                                        <IconButton onClick={() => toggleDelete(item)}>
                                            <DeleteForeverIcon sx={{ color: '#ff5c40' }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>

                            {/* order summary */}
                            <div className='text-sm lg:w-1/3 w-full p-3 bg-white shadow-xl flex flex-col gap-2 sticky'>
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-[#ff5c40] font-bold'>Order Summary</h1>
                                    <p className='font-bold'>{cart.length} Item{cart.length > 1 ? 's' : ''}</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-gray-500'>Delivery Charges</h1>
                                    <p>N/A</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-gray-500'>SubTotal</h1>
                                    <p className='font-bold'>₦{totalAmount}</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='font-semibold'>Total</h1>
                                    <p className='font-bold text-green-500'>₦{totalAmount}</p>
                                </div>
                                <hr />
                                <Link onClick={CreateOrder}>
                                    <Button sx={{ color: 'white', textTransform: 'none' }} className='cart-btn'>
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </section>

            {/* delete item */}
            {deletedItem && (
                <div className='absolute h-[100vh] px-2 overflow-y-none w-full bg-[#00000078] top-0 z-40 flex justify-center'>
                    <div className='bg-white shadow-xl rounded-md p-4 flex flex-col gap-3 w-[500px] h-[150px] mt-16'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Confirm Delete</h1>
                            <Cancel onClick={() => setDeletedItem(null)} className='text-gray-400 cursor-pointer' />
                        </div>
                        <p className='text-sm'>Are you sure you want to remove this item from the cart?</p>
                        <div className='w-full flex items-center justify-end gap-2'>
                            <div onClick={() => setDeletedItem(null)} className='border border-gray-400 rounded-md p-1 cursor-pointer'>
                                Cancel
                            </div>
                            <div onClick={() => deleteItemFromCart(deletedItem)} className='text-[#ff5c40] font-semibold cursor-pointer'>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
