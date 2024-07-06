import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../../Assets/images/home-placeholder.jpeg';
import { Button, Skeleton } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ItemDetails = () => {
  const { idl_product_code, supplier_id } = useParams();
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [largeImage, setLargeImage] = useState(!item ? "" : item.main_picture);


  useEffect(() => {
    const fetchItemDetails = async () => {
      const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
      const url = `https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/detail/${idl_product_code}/${supplier_id}`;

      try {
        const response = await fetch( url, {
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
        setItem(data.data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [idl_product_code, supplier_id]);

  // if item does not exist
  if (!item && !loading) {
    return <div>Item not found</div>;
  }

  const handleIncrement = () => {
    if (item && count < item.product_variants.length > 0 && item.product_variants[0].stock_quantity) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // const changeImage = (e, image) => {
  //   e.preventDefault();
  //   setLargeImage(image);
  // }

  return (
    <div className='grid lg:grid-cols-2 lg:p-12 p-4 mt-8 mb-16 gap-8'>
      <div className='px-4 border-2 border-gray-300 w-full p-2 flex flex-col items-center justify-center'>

        {/* main image */}
        <div className='h-full lg:w-[400px] relative item-card'>
          {loading ? (
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={300} width={300} />
          ) : (
            <>
              <div className='absolute h-full lg:w-[400px] w-full bg-[#00000068] cursor-pointer gap-2 rounded opacity-0 item-overlay flex items-center justify-center text-white'>
                <RemoveRedEyeOutlinedIcon className='!text-white' />
                <p>Preview</p>
              </div>
              {/* <img src={largeImage} alt={item.product_name} className=' h-full w-[400px] rounded object-cover' /> */}
              <img src={item.main_picture} alt={item.product_name} className=' h-full w-[400px] rounded object-cover' />
            </>
          )}
        </div>

        {/* other images */}
        {loading ? (
          <div className='flex items-center justify-center mt-4 gap-4'>
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
            <Skeleton animation='wave' variant='rectangle' sx={{ borderRadius: '8px' }} height={60} width={60} />
          </div>
        ) : (
          <div className='flex items-center justify-center mt-4 gap-4'>
            {item.other_pictures.map((pic)=>(
              // <img onClick={(e) => changeImage(e, pic)} className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={pic} alt="" />
              <img  className='h-[60px] w-[60px] object-cover rounded hover:border border-[#ff5c40] cursor-pointer hover:scale-90 transition ease-in delay-150 hover:scale-100' src={pic} alt="" />
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
              <h1 className='lg:text-3xl text-gray-400'>{item.category}</h1>
              <p className='text-green-600 font-semibold lg:text-2xl'>₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}</p>
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
                <h1 className='text-gray-400'>{item.product_variants.length > 0 && item.product_variants[0].colour}</h1>
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
                <h1>Stock Quantity :</h1>
                <h1 className='text-gray-400'>{item.product_variants.length > 0 && item.product_variants[0].stock_quantity}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Brand :</h1>
                <h1>{item.brand}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold w-full'>
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1>Product Code :</h1>
                <h1 className='text-green-400 font-italic'>{item.idl_product_code}</h1>
              </>
            )}
          </div>
          <div className='flex items-center gap-4 font-semibold pb-8 w-full'>
            {/* <h1> Quantity </h1>
            <div className='flex items-center gap-3'>
              <div onClick={handleDecrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> - </div>
              <span className=''> {count} </span>
              <div onClick={handleIncrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> + </div>
            </div> */}
            {loading ? (
              <Skeleton variant='text' className='!w-1/3 !h-[30px]' />
            ) : (
              <>
                <h1> Quantity </h1>
                <div className='flex items-center gap-3'>
                  <div onClick={handleDecrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> - </div>
                  <span className=''> {count} </span>
                  <div onClick={handleIncrement} className='rounded h-[30px] w-[30px] bg-[#ff5c40] text-white flex items-center cursor-pointer justify-center text-2xl font-light p-2'> + </div>
                </div>
              </>
            )}
          </div>


          <div className='flex flex-col items-start gap-4 py-4 justify-between h-[150px] border-t border-b border-gray-300 w-full'>
            <div className='flex items-center gap-4 w-full'>
              { loading ? (
                <Skeleton variant='text' className='!w-full !h-[30px]' />
              ) : (
                <>                
                  <h1>Product Description :</h1>
                  <h1 className='text-gray-600 font-bold '>{item.description}</h1>
                </>
              ) }
            </div>
            { loading ? (
              <Skeleton variant='text' className='!w-full !h-[30px]' />
            ) : (
              <Button className='!text-white !w-full !bg-green-500 !normal-case' >Add To Cart</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails