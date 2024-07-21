import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Footer } from '../../components';
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';

const Checkout = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const { CreateOrder } = useContext(AuthContext);
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

    useEffect(() => {
        const storedOrder = localStorage.getItem('order');
        if (storedOrder) {
            setOrder(JSON.parse(storedOrder));
        }
    }, []);

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
    const totalAmount = shippingCost + productsAmount;
    const formattedTotalAmount = formatCurrency(totalAmount);

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
        phone,
        products,
        totalAmount,
        callback_url: '',
        discount_amount: '',
    });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting form with state:", state);
        try {
            const response = await CreateOrder(state);
            console.log("CreateOrder response:", response);
            setState({
                email,
                order_id: order.order_id,
                first_name,
                last_name,
                address_1: '',
                address_2: '',
                city: '',
                state: '',
                country: 'Nigeria',
                phone,
                products,
                totalAmount,
                callback_url: '',
                discount_amount: '',
            });
        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setLoading(false);
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
                                <div className='w-full flex items-center gap-2 my-2'>
                                    <input type="checkbox" name="save" id="save" />
                                    <label htmlFor="save">Save details for future orders</label>
                                </div>
                                <button className={`w-max p-2 px-3 self-center rounded-md bg-gray-400 text-white ${loading ? 'cursor-not-allowed' : ''}`} type="submit">
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
                                <div key={index} className='text-sm flex items-center w-full justify-between lg:gap-12 mb-2 lg:p-5 bg-[#f9fafc] rounded-md'>
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
                                <p className='font-semibold text-green-500'>{formattedTotalAmount}</p>
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
