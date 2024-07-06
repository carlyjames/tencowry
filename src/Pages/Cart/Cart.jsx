import React, { useState } from 'react'

// components
import { Navbar, Footer } from '../../components'
import { Link } from 'react-router-dom'

// icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// images
import img from '../../Assets/images/TopDeals/img1.jpg'
import { Cancel } from '@mui/icons-material';

const Cart = () => {
    const [deleted, setDelete] = useState(false);

    const toggleDelete = () => {
        setDelete((prevState) => !prevState);
      }


    return (
        <div>
            <section className='relative'>
                <Navbar />

                <div className='bg-[#f2f2f2] p-4'>

                    {/* header */}
                    <div className='w-full p-3 flex items-center justify-between mb-2'>
                        <h1 className='text-gray-500 lg:text-3xl'>Shopping Cart</h1>
                        <Link to='/' className='p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>Continue Shopping</Link>
                    </div>
                    <hr />

                    <div className='flex lg:flex-row flex-col w-full items-start mt-8 gap-4 lg:gap-32'>
                        {/* order details */}
                        <div className='lg:w-2/3 bg-white text-sm shadow-xl gap-2 h-max lg:h-[200px] mb-8 rounded-md p-6 flex flex-col items-start justify-between'>
                            <div className='flex lg:flex-row md:flex-col flex-col items-start gap-4 lg:gap-12'>
                                <img className='h-[100px] w-[100px] object-cover' src={img} alt="" />
                                {/* product details */}
                                <div className='flex flex-col gap-3 items-start'>
                                    <h1 className='text-gray-500'>Applicable To THERMACELL Mosquito Killer Movable</h1>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>Color:</p>
                                        <p>Blue</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>Size:</p>
                                        <p className='text-[#ff5c40] font-semibold'>N/A</p>
                                    </div>
                                </div>
                                {/* product quantity */}
                                <div className='flex flex-col gap-3 items-start'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='flex gap-2'>
                                            <p className='font-bold'>Quantity:</p>
                                            <p className='text-green-500 font-semibold italic'>X 1</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='flex items-center justify-center bg-slate-300 cursor-pointer'> <RemoveIcon /> </div>
                                            <div className='flex items-center justify-center border-gray-400 border cursor-pointer'> <AddIcon sx={{ color: '#ff5c40' }} /> </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='font-bold'>Price:</p>
                                        <p className='text-[#ff5c40]'>₦39,394.08</p>
                                    </div>
                                </div>
                            </div>


                            {/* delete api */}
                            <IconButton onClick={toggleDelete}>
                                <DeleteForeverIcon sx={{ color: '#ff5c40' }} />
                            </IconButton>
                        </div>


                        {/* order summary */}
                        <div className='text-sm lg:w-1/3 w-full p-3 bg-white shadow-xl flex flex-col gap-2'>
                            <div className='flex p-x py-3 items-center justify-between'>
                                <h1 className='text-[#ff5c40] font-bold'>Order Summary</h1>
                                <p className='font-bold'>1 Item</p>
                            </div>
                            <hr />
                            <div className='flex p-x py-3 items-center justify-between'>
                                <h1 className='text-gray-500'>Delivery Charges</h1>
                                <p className=''>N/A</p>
                            </div>
                            <hr />
                            <div className='flex p-x py-3 items-center justify-between'>
                                <h1 className='text-gray-500'>SubTotal</h1>
                                <p className='font-bold'>₦39,394.08</p>
                            </div>
                            <hr />
                            <div className='flex p-x py-3 items-center justify-between'>
                                <h1 className='font-semibold '>Total</h1>
                                <p className='font-bold text-green-500'>₦39,394.08</p>
                            </div>
                            <hr />
                            <Button sx={{ color: 'white', textTransform: 'none' }} className='cart-btn' >Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>


                <Footer />
            </section>

            {/* delete item */}
            { deleted && (
                <div className='absolute h-[100vh] px-2 overflow-y-none w-full bg-[#00000078] top-0 z-40 flex justify-center'>
                    <div className='bg-white shadow-xl rounded-md p-4 flex flex-col gap-3 w-[500px] h-[150px] mt-16'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Confirm Delete</h1>
                            <Cancel onClick={toggleDelete} className='text-gray-400 cursor-pointer' />
                        </div>
                        <p className='text-sm'>Are you sure you want to remove this item from the cart?</p>
                        <div className='w-full flex items-center justify-end gap-4'>
                            <div onClick={toggleDelete} className='cursor-pointer p-1 px-2 border border-gray-400 rounded-md'>Cancel</div>
                            <div className='cursor-pointer text-[#ff5c40] font-bold'>Delete</div>
                        </div>
                    </div>
                </div> 
            ) }
        </div>
    )
}

export default Cart