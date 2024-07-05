import React, {useState, useContext} from 'react'
import AuthContext from '../Context/AuthContext'


const RegisterSeller = ({toggleSeller}) => {
    const [loading, setLoading] = useState(false);
    const { registerSeller } = useContext(AuthContext);

    const [state, setState] = useState({
        full_name: '',
        address_1: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        brand_name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerSeller(state);
            // setIsRegistered(true);
            setState({
                full_name: '',
                address_1: '',
                city: '',
                state: '',
                country: '',
                phone: '',
                email: '',
                brand_name: '',
            });
        } finally {
            setLoading(false);
            toggleSeller(false)
        }
    };

    return (
        <form action="" name='register' onSubmit={handleSubmit} className='p-8 bg-white w-max h-max text-black rounded-xl'>
            <p className='text-end text-xl text-gray-400 cursor-pointer' onClick={toggleSeller}>X</p>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl'>Become a Seller</h1>
                <p>Please fill the form below. We will reach out to you in no distant time.</p>
                <div className='h-[1px] w-full bg-gray-400'></div>
            </div>
            <div className='flex flex-col items-center justify-end gap-4 w-full mt-8'>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="full_name" className='w-1/4'><span className='text-red-400 mx-1'>*</span>Full Name:</label>
                    <input value={state.full_name} onChange={handleChange} type="text" id='full_name' name='full_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-between w-full'>
                    <label htmlFor="phone" className='w-2/4 '><span className='text-red-400 mx-1'>*</span>Phone Number:</label>
                    <input value={state.phone} onChange={handleChange} type="number" id='phone' name='phone' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-between w-full'>
                    <label htmlFor="email" className='w-2/4 '><span className='text-red-400 mx-1'>*</span>Email:</label>
                    <input value={state.email} onChange={handleChange} type="email" id='email' name='email' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="address" className='w-1/4'><span className='text-red-400 mx-1'>*</span>Address 1:</label>
                    <input value={state.address_1} onChange={handleChange} type="text" id='address' name='address_1' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="city" className='w-1/4'><span className='text-red-400 mx-1'>*</span>City:</label>
                    <input value={state.city} onChange={handleChange} type="text" id='city' name='city' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="state" className='w-1/4'><span className='text-red-400 mx-1'>*</span>State:</label>
                    <input value={state.state} onChange={handleChange} type="text" id='state' name='state' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="country" className='w-1/4'><span className='text-red-400 mx-1'>*</span>Country:</label>
                    <input value={state.country} onChange={handleChange} type="text" id='country' name='country' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <div className='flex items-center gap-2 justify-around w-full'>
                    <label htmlFor="brand" className='w-1/4'><span className='text-red-400 mx-1'>*</span>Brand:</label>
                    <input value={state.brand_name} onChange={handleChange} type="text" id='brand' name='brand_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400'  />
                </div>
                <button className={`w-full p-1 rounded-md  text-white ${loading ? 'cursor-not-allowed' : ''}`} type="submit">
                    {loading ? (
                        <div className='flex items-center justify-center gap-2'>
                            <div className="spinner"></div>
                            <p className='text-[#ff5c40]'>Submitting</p>
                        </div>
                    ) : (
                        <p className='text-[#ff5c40]'>Submit</p>
                    )}
                </button>
            </div>
        </form>
    )
}

export default RegisterSeller