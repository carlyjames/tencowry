import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  const [loading, setLoading] = useState(false);
  const [myID, setMyID] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');
  const id = queryParams.get('id')
  // MAKE AN API CALL TO RETURN STATUS AND ID
  useEffect(() => {
    const fetchID = async () => {
      const apiRoot = process.env.REACT_APP_API_ROOT;
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `${apiRoot}/payment/${id}/orderid`;

      try {
        setLoading(true);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch id');
        }
        const data = await response.json();
        setLoading(false);
        setMyID(data.data);
        setPaymentStatus(data.status);
      } catch (error) {
        console.error('Error fetching id:', error);
        setLoading(false);
        setPaymentStatus('failed');
      }
    };

    fetchID();
  }, [id]);
  // USE STATUS TO QUERY WHAT TO DISPLAY TO USER
  const displayMessage = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (paymentStatus === 'success') {
      return <p className='text-green-500'>Payment Successful! Your Order ID is {myID}.</p>;
    } else {
      return <p className='text-red-500'>Payment Failed. Please try again.</p>;
    }
  };
  // A BUTTON TO REDIRECT USER TO HOMEPAGE

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      {displayMessage()}
      <Link to='/' className='mt-4 p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
        Continue Shopping
      </Link>
    </div>
  )
}

export default Confirmation