import React, { useState, useEffect, useContext } from 'react'

// components
import { Navbar, Footer } from './'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import Swal from 'sweetalert2';


const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    const [state, setState] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginUser(state);
            setState({
                email: '',
                password: '',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <Navbar />
            <div className='w-full  flex items-center justify-center bg-slate-100'>
                <div className=' p-6 flex flex-col items-center gap-6 bg-white w-[400px] my-2 shadow'>
                    <h1 className='text-gray-700 font-semibold text-center text-lg lg:text-2xl py'>LOGIN</h1>
                    <p className='font-semibold text-xs text-center'>Don't have an account with us ?, please <Link className='text-[#ff5c40]' to='/register' >Register </Link></p>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <form className='w-full flex flex-col gap-6' action="" name='register' onSubmit={handleSubmit}>
                        <div className='w-full flex flex-col items-start gap-2'>
                            <label htmlFor='email' className='flex gap-1 w-full '><span className='text-red-400'>*</span>Email</label>
                            <input value={state.email} onChange={handleChange} id='email' name='email' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="email" />
                        </div>
                        <div className='w-full flex flex-col items-start gap-2'>
                            <label htmlFor='password' className='flex gap-1 w-full '><span className='text-red-400'>*</span>Password</label>
                            <input value={state.password} onChange={handleChange} id='password' name='password' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="password" />
                        </div>
                        <button
                            className={`w-full p-1 rounded-md ${state.email === '' ||
                                state.first_name === '' ||
                                state.last_name === '' ||
                                state.password === '' ||
                                state.phone === ''
                                ? 'bg-gray-400'
                                : 'bg-[#ff5c40]'
                                } text-white ${loading ? 'bg-[#ff5d4093] cursor-not-allowed' : ''}`}
                            disabled={
                                state.email === '' ||
                                state.first_name === '' ||
                                state.last_name === '' ||
                                state.password === '' ||
                                state.phone === '' ||
                                loading
                            }
                            type="submit"
                        >
                            {loading ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <div className="spinner"></div>
                                    <p>Submitting</p>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Login;