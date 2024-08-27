import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Footer } from '../../components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';

const Checkout = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const { CreateOrder } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(false);
    const [shippingInfoLoaded, setShippingInfoLoaded] = useState(false);
    const token = localStorage.getItem("authTokens");
    let email = '';
    let first_name = '';
    let last_name = '';
    let phone = '';
    // console.log("order_id :", order.order_id);
    // let order_id = order.order_id;

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

    useEffect(() => {
        const storedOrder = localStorage.getItem('order');
        if (storedOrder) {
            const orderData = JSON.parse(storedOrder);
            setOrder(orderData);
            setState((prevState) => ({
                ...prevState,
                order_id: orderData.order_id,
                products: orderData.products || [],
                shipping_cost: orderData.shipping_cost || 0,
                products_amount: orderData.products_amount || 0,
                total_amount: Number(orderData.shipping_cost || 0) + Number(orderData.products_amount || 0),
            }));
        }

        const fetchShippingInfo = async () => {
            const apiRoot = process.env.REACT_APP_API_ROOT;
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `${apiRoot}/shipping/info/${email}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${apiKey}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const shippingData = data.data;
                    setState((prevState) => ({
                        ...prevState,
                        first_name: shippingData.first_name || first_name,
                        last_name: shippingData.last_name || last_name,
                        address_1: shippingData.address_1 || '',
                        address_2: shippingData.address_2 || '',
                        city: shippingData.city || '',
                        state: shippingData.state || '',
                        country: shippingData.country || 'Nigeria',
                        post_code: shippingData.postcode || '',
                        phone: shippingData.phone || phone,
                    }));
                    setShippingInfoLoaded(true);
                } else {
                    console.error("Failed to fetch shipping info:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to fetch shipping info:", error);
            }
        };

        fetchShippingInfo();
    }, [email, first_name, last_name, phone]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const products = Array.isArray(order?.products) ? order.products : [];
    const shippingCost = order.shipping_cost != null ? Number(order.shipping_cost) : 0;
    const productsAmount = order.products_amount != null ? Number(order.products_amount) : 0;
    const total_amount = shippingCost + productsAmount;
    const formattedtotal_amount = formatCurrency(total_amount);

    const [state, setState] = useState({
        email,
        order_id: order.order_id,
        first_name,
        last_name,
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        country: 'Nigeria',
        post_code: '',
        phone,
        products: order.products,
        total_amount,
        callback_url: 'https://tencowry.vercel.app/',
        // discount_amount: '0',
    });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await CreateOrder(state);
            console.log("CreateOrder response:", response);
    
            if (response && response.status === false) {
                console.error("Order creation failed:", response.message || "No error message provided");
                Swal.fire({
                    title: 'Order creation failed',
                    text: response.message || 'An error occurred',
                    icon: 'error',
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else if (response) {
                Swal.fire({
                    title: 'Order created successfully',
                    text: response.message || 'Order was successfully created',
                    icon: 'success',
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
            
        } catch (error) {
            console.error("Checkout failed:", error);
            Swal.fire({
                title: 'Error during checkout',
                text: error.message || JSON.stringify(error) || 'An unexpected error occurred',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const saveAddress = async () => {
        const apiRoot = process.env.REACT_APP_API_ROOT;
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `${apiRoot}/shipping/info/${email}`;

        const shipping_info = {
            first_name,
            last_name,
            address_1: state.address_1,
            address_2: state.address_2,
            city: state.city,
            state: state.state,
            postcode: state.post_code,
            country: state.country,
            phone,
            email,
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': apiKey
                },
                body: JSON.stringify({ shipping_info }),
            });
            // console.log(shipping_info);
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error response:", errorResponse);
                throw new Error('Failed to save address');
            }
            Swal.fire({
                title: 'Shipping details saved successfully',
                icon: 'success',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                title: 'Error saving shipping details',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    };

    return (
        <div>
            <section className='relative'>
                <Navbar />
                <div className='bg-[#f2f2f2] p-4'>
                    {/* header */}
                    <div className='w-full p-3 flex items-center justify-between mb-2'>
                        <h1 className='text-gray-500 lg:text-3xl'>Checkout</h1>
                        <Link to='/' className='p-1 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
                            Modify Cart
                        </Link>
                    </div>
                    <hr />

                    <div className='flex lg:flex-row flex-col w-full items-start mt-8 gap-4 lg:gap-12 lg:px-5'>
                        {/* shipping details */}
                        <div className='lg:w-2/3 w-full flex flex-col p-3 bg-white shadow-xl font-semibold text-sm'>
                            <div className='w-full flex items-center justify-between lg:p-5 p-2'>
                                <h1 className='text-[#ff5c40]'>Shipping Address</h1>
                                <h1 className='text-gray-400'>Order ID - {order.order_id}</h1>
                            </div>
                            <hr />

                            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2 font-medium lg:px-6' name='register'>
                                {shippingInfoLoaded === true ? (
                                    <div className='grid lg:grid-cols-2'>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='flex items-center gap-2'>Name : <span>{state.first_name}</span></h1>
                                            <h1 className='flex items-center gap-2'>Phone Number : <span>{state.phone}</span></h1>
                                            <h1 className='flex items-center gap-2'>Address : <span>{state.address_1}</span></h1>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='flex items-center gap-2'>City : <span>{state.city}</span></h1>
                                            <h1 className='flex items-center gap-2'>State : <span>{state.state}</span></h1>
                                            <h1 className='flex items-center gap-2'>Email : <span>{state.email}</span></h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col gap-2'>
                                        <div className='w-full my-3 flex flex-col items-start gap-2'>
                                            <label htmlFor='first_name' className='flex gap-1 w-full'>First Name</label>
                                            <input value={first_name} id='first_name' name='first_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" disabled />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='last_name' className='flex gap-1 w-full'>Last Name</label>
                                            <input value={last_name} id='last_name' name='last_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" disabled />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='phone' className='flex gap-1 w-full'>Phone</label>
                                            <input value={phone} id='phone' name='phone' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="number" disabled />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='email' className='flex gap-1 w-full'>Email</label>
                                            <input value={email} id='email' name='email' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="email" disabled />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='address_1' className='flex gap-1 w-full'>Shipping Address 1</label>
                                            <input id='address_1' name='address_1' value={state.address_1} onChange={handleChange1} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" required />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='address_2' className='flex gap-1 w-full'>Shipping Address 2</label>
                                            <input id='address_2' name='address_2' value={state.address_2} onChange={handleChange1} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='city' className='flex gap-1 w-full'>Shipping City</label>
                                            <input id='city' name='city' value={state.city} onChange={handleChange1} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" required />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='state' className='flex gap-1 w-full'>Shipping State</label>
                                            <input id='state' name='state' value={state.state} onChange={handleChange1} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" required />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='country' className='flex gap-1 w-full'>Shipping Country</label>
                                            <input id='country' name='country' value={state.country} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" disabled />
                                        </div>
                                        <div className='w-full flex flex-col items-start gap-2'>
                                            <label htmlFor='post_code' className='flex gap-1 w-full'>Post Code</label>
                                            <input id='post_code' name='post_code' value={state.post_code} onChange={handleChange1} className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" />
                                        </div>
                                        <div onClick={saveAddress} className='w-full flex items-center gap-2 my-2'>
                                            <input checked={isChecked} onChange={handleCheckboxChange} type="checkbox" name="save" id="save" />
                                            <label htmlFor="save">Save details for future orders</label>
                                            {/* <p>The checkbox is {isChecked ? 'checked' : 'unchecked'}.</p> */}
                                        </div>
                                    </div>
                                )}

                                <button className={`w-max p-2 px-3 self-center rounded-md bg-[#ff5c40] text-white ${loading ? 'cursor-not-allowed' : ''}`} type="submit">
                                    {loading ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className="spinner"></div>
                                            <p className='text-white'>Submitting</p>
                                        </div>
                                    ) : (
                                        <p className='text-white'>Submit</p>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* order details */}
                        <div className='text-sm lg:w-1/3 w-full p-3 bg-white shadow-xl flex flex-col gap-2 sticky font-semibold'>
                            <div className='w-full flex items-center justify-between lg:p-5 p-2'>
                                <h1 className='text-[#ff5c40]'>Order Details</h1>
                            </div>
                            <hr />
                            <div className='lg:p-5 p-2'>
                                <h1 className='flex items-center gap-2'>Estimated Delivery: <p className='text-green-500'>{order.estimated_delivery}</p></h1>
                            </div>
                            {products.map((item, index) => (
                                <div key={index} className='text-sm flex flex-col lg:flex-row  items-center w-full justify-between lg:gap-12 mb-2 lg:p-5 bg-[#f9fafc] rounded-md'>
                                    <img src={item.main_picture} alt={item.product_name} className='w-1/4 h-16 object-cover' />
                                    <div className='flex flex-col gap-2 w-3/4 text-xs'>
                                        <p className='text-sm text-gray-400'>{item.product_name}</p>
                                        <p>Color: <span className='text-[#ff5c40]'>{item.colour}</span></p>
                                        <p>Unit Price: <span className='text-green-500'>{item.naira_price}</span></p>
                                        <p>Quantity: <span className='text-gray-500'>{item.quantity}</span></p>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <div className='flex items-center justify-between w-full py-3 font-medium'>
                                <h1>Shipping Cost</h1>
                                <p className='font-semibold'>{order.shipping_cost}</p>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between w-full py-4 font-medium'>
                                <h1>Products Amount</h1>
                                <p className='font-semibold'>{order.products_amount}</p>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between w-full py-4 font-medium'>
                                <h1>Savings</h1>
                                <p className='font-semibold text-red-500'>-₦0.00</p>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between w-full py-4 font-medium'>
                                <input id='voucher' placeholder='ENTER VOUCHER CODE' name='voucher' className='border border-gray-400 w-2/3  p-2 rounded-md hover:border-blue-400' type="text" />
                                <button className='bg-[#ff5c40] p-2 px-4 text-white rounded-md'>Apply</button>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between w-full lg:py-8'>
                                <h1 className='font-semibold'>Total</h1>
                                <p className='font-semibold text-green-500'>{formattedtotal_amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Checkout;
