'use client'

import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import userEvent from '@testing-library/user-event';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    try {
      return tokens ? jwtDecode(tokens) : null;
    } catch (error) {
      // console.error('Invalid token during initialization', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const loginUser = async (userData) => {
    const { email, password } = userData;

    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiRoot}/login/customer`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok && data.status) { 
        setAuthTokens(data);
  
        try {
          setUser(data.data);

          localStorage.setItem('authTokens', JSON.stringify(data));
          navigate('/');
          Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Invalid token:', error);
          Swal.fire({
            title: 'Invalid Token',
            icon: 'error',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
          });
          return;
        }
  
      } else {
        Swal.fire({
          title: 'Email or password incorrect',
          icon: 'error',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      Swal.fire({
        title: 'An Error Occurred',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  };
  
  const registerUser = async (userData) => {
    const { first_name, last_name, phone, email, password } = userData;
    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiRoot}/signup/customer`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`
        },
        body: JSON.stringify({
          first_name,
          last_name,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Registration Successful',
          icon: 'success',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error('Registration failed:', response.status, data);
        Swal.fire({
          title: '' + (data.message || response.status),
          icon: 'error',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      Swal.fire({
        title: 'An Error Occurred',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerSeller = async (userData) => {
    const { full_name, address_1, city, state, country, phone, email, brand_name } = userData;

    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiRoot}/seller/prospective`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`
        },
        body: JSON.stringify({full_name, address_1, city, state, country, phone, email, brand_name}),});

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Seller details has been captured',
          icon: 'success',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error('Registration failed:', response.status, data);
        Swal.fire({
          title: '' + (data.message || response.status),
          icon: 'error',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      Swal.fire({
        title: 'An Error Occurred',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }

  const UpdatePassword = async (userData) => {
    const { email, old_password, new_password } = userData;

    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiRoot}/update_password`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`
        },
        body: JSON.stringify({ email, old_password, new_password }),});

      const data = await response.json();
      console.log('Response:', data); 

      if (response.ok) {
        Swal.fire({
          title: 'Password Changed Successfully',
          icon: 'success',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error('Password change failed:', response.status, data);
        Swal.fire({
          title: '' + (data.message || response.status),
          icon: 'error',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('An error occurred during password reset:', error);
      Swal.fire({
        title: 'An Error Occurred',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
 
  }

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens')
    Swal.fire({
      title: 'You have been logged out...',
      icon: 'success',
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const CreateOrder = async (userData) => {
    const { 
      order_id,
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      state,
      country,
      phone,
      email,
      products,
      totalAmount,
      callback_url,
      discount_amount,
     } = userData;

    
    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${apiRoot}/order/create`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`
        },
        body: JSON.stringify({ 
          email,
          order_id,
          first_name,
          last_name,
          address_1,
          address_2,
          city,
          state,
          country,
          phone,
          email,
          products,
          totalAmount,
          callback_url,
          discount_amount,
         }),
      });
  
      const data = await response.json();
      console.log('Response:', data); 
  
      if (response.ok) {
        Swal.fire({
          title: 'Checkout Success',
          icon: 'success',
          toast: true,
          timer: 2000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = response?.data?.link; 
        }, 3000);
      } else {
        console.error('Checkout failed:', response.status, data);
        Swal.fire({
          title: '' + (data.message || response.status),
          icon: 'error',
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('An error occurred during checkout:', error);
      Swal.fire({
        title: 'An Error Occurred',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }
  

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    registerSeller,
    CreateOrder,
    UpdatePassword,
  };

  useEffect(() => {
    if (authTokens) {
      try {
        setUser(jwtDecode(authTokens.access));
      } catch (error) {
        // console.error('Invalid token', error);
        setAuthTokens(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};