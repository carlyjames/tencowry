import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// mui
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { Google, Instagram, FacebookOutlined, Twitter } from '@mui/icons-material'


const Newsletter = () => {
  return (
    <div className='grid lg:grid-cols-3 bg-[#232f3e] p-8 text-white gap-4'>
      <div className='lg:flex hidden items-center gap-4'>
        <SendOutlinedIcon sx={{ fontSize: '36px' }} className='transform -rotate-45' />
        <div className='flex flex-col items-start gap-2'>
          <h1 className='text-2xl font-bold'>Signup For Newsletter</h1>
          <p className=' text-gray-300'>We’ll never share your email address with a third-party.</p>
        </div>
      </div>
      <div className='flex items-center justify-center '>
        <input className='border border-[#ff5c40] p-2 w-full bg-white text-black rounded-l-lg  ' type="email" placeholder='Your email address....' />
        <div className='bg-[#ff5c40] rounded-r-lg p-2 border border-[#ff5c40]  text-white'> Subscribe </div>
      </div>
      <div className='flex items-center justify-center gap-4 w-full'>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <Google />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <FacebookOutlined />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <Twitter />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <Instagram />
        </div>
      </div>
    </div>
  )
}

export default Newsletter