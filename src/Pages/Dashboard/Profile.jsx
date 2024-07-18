import React, { useState, useContext } from 'react'

// components
import { Navbar, Footer } from '../../components'
import AuthContext from '../../Context/AuthContext';

// mui
import { Box, Tabs, Tab, Skeleton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    indicator: {
        background: 'none'
    },
    tabs: {
        "& button[aria-selected='true']": {
            position: "relative",
            color: "#ff5c40"
        }
    }
});


const Profile = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const { UpdatePassword } = useContext(AuthContext);
    const token = localStorage.getItem("authTokens");
    let email = '';
    let first_name = '';
    let last_name = '';
    let phone = '';

    if (token) {
        try {
            const parsedToken = JSON.parse(token);
            email = parsedToken.data.email;
            first_name = parsedToken.data.first_name;
            last_name = parsedToken.data.last_name;
            phone = parsedToken.data.phone;
        } catch (error) {
            console.error("Error parsing token:", error.message);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [state, setState] = useState({
        email,
        new_password: '',
        old_password: '',
    });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await UpdatePassword(state);
            if (state.new_password === '' || state.old_password === '') {
                setError(true)
            }else{
                setError(false)
            }
            setState({
                email,
                new_password: '',
                old_password: '',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='bg-[#f2f2f2]'>
            <Navbar />
            <section className='w-full flex items-center justify-center my-8'>
                <div className='bg-white lg:p-4 p-2 lg:w-[80%] w-[100%]'>
                    <h1 className='text-center lg:text-3xl'>My Account</h1>
                    <div className='w-full lg:p-8'>
                        <Tabs className={`${classes.tabs} overflow-x-scroll`} indicatorColor={""} classes={{ indicator: classes.indicator }} value={value} onChange={handleChange}>
                            <Tab color='secondary' className='tab-button-2 sm:text-xs' label="Profile" {...a11yProps(0)} />
                            <Tab color='secondary' className='tab-button-2' label="Update Profile" {...a11yProps(1)} />
                        </Tabs>
                        <CustomTabPanel value={value} index={0}>
                            <div className=' p-6 flex flex-col items-center gap-4 bg-white w-full '>
                                <h1 className='text-gray-700 text-center text-lg lg:text-2xl'>Profile Details</h1>
                                <div className='w-full flex flex-col gap-4' action=""  >
                                    <div className='w-full mt-5 flex  items-center justify-end gap-2'>
                                        <label htmlFor='first_name' className='flex gap-1  '>First Name : </label>
                                        <input value={first_name} id='first_name' name='first_name' className='border border-gray-400 w-2/3 p-2 rounded-md hover:border-blue-400' disabled />
                                    </div>
                                    <div className='w-full flex  items-center justify-end gap-2'>
                                        <label htmlFor='last_name' className='flex gap-1 '>Last Name : </label>
                                        <input value={last_name} id='last_name' name='last_name' className='border border-gray-400 w-2/3 p-2 rounded-md hover:border-blue-400' disabled />
                                    </div>
                                    <div className='w-full flex  items-center justify-end gap-2'>
                                        <label htmlFor='email' className='flex gap-1 '>Email : </label>
                                        <input value={email} id='email' name='email' className='border border-gray-400 w-2/3 p-2 rounded-md hover:border-blue-400' disabled />
                                    </div>
                                    <div className='w-full flex  items-center justify-end gap-2'>
                                        <label htmlFor='phone' className='flex gap-1 '>Phone Number : </label>
                                        <input value={phone} id='phone' name='phone' className='border border-gray-400 w-2/3 p-2 rounded-md hover:border-blue-400' disabled />
                                    </div>

                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className=' p-6 flex flex-col items-center gap-4 bg-white w-full '>
                                <h1 className='text-gray-700  text-center text-lg lg:text-2xl'>Update Password</h1>
                                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4' action=""  >
                                    <div className='w-full mt-5 flex  items-center justify-end gap-2 hidden'>
                                        <label htmlFor='email' className='flex gap-1  '><span className='text-red-400'>*</span>Email : </label>
                                        <input value={email} onChange={handleChange1} id='email' name='email' className='border border-gray-400 w-2/3 p-2 rounded-md hover:border-blue-400' type='text' />
                                    </div>
                                    <div className='w-full mt-5 flex  items-center justify-end gap-2'>
                                        <label htmlFor='first_name' className='flex gap-1  '><span className='text-red-400'>*</span>Old Password : </label>
                                        <div className='flex flex-col w-2/3'>
                                            <input value={state.old_password} onChange={handleChange1} id='old_password' name='old_password' className='border border-gray-400 p-2 rounded-md hover:border-blue-400' type='text' />
                                            {error ? (<span className='text-sm text-red-400'>Please enter your old password</span>) : '' }
                                        </div>
                                    </div>
                                    <div className='w-full flex  items-center justify-end gap-2'>
                                        <label htmlFor='last_name' className='flex gap-1 '><span className='text-red-400'>*</span>New Password : </label>
                                        <div className='flex flex-col w-2/3'>
                                            <input value={state.new_password} onChange={handleChange1} id='new_password' name='new_password' className='border border-gray-400  p-2 rounded-md hover:border-blue-400' type='text' />
                                            {error ? (<span className={`text-sm text-red-400`}>Please enter your new password</span>) : '' }
                                        </div>
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
                                </form>
                            </div>
                        </CustomTabPanel>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Profile