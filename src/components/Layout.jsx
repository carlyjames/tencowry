import React from 'react'
import { Navbar } from './'

const Layout = ({ children }) => {
    return (
        <div className='body bg-[#f6f9fc]'>
            <Navbar />
            <div className=''>
                {children}
            </div>
        </div>
    )
}

export default Layout