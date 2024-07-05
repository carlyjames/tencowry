'use client'

import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      console.error('Invalid token during initialization', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const loginUser = async (userData) => {
    const { email, password } = userData;
    const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
    const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/login/customer';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiKey
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      console.log('Response Status:', response.status); // Log the response status
      console.log('Response Data:', data); // Log the response data
  
      if (response.ok && data.access) { // Ensure the condition is correct
        console.log('Logged In');
        setAuthTokens(data);
  
        try {
          const decodedToken = jwtDecode(data.access);
          setUser(decodedToken);
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
      } else {
        console.log('Failed Login Attempt', response.status);
        console.log('Server responded with:', data);
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
    const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
    const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/signup/customer';

    console.log('Sending request with data:', userData); // Log the request payload

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiKey,
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
      console.log('Response:', data); // Log the response data

      if (response.ok) {
        // navigate('/login');
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
    const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';
    const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/seller/prospective';

    console.log('Sending request with data:', userData); // Log the request payload

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiKey,
        },
        body: JSON.stringify({full_name, address_1, city, state, country, phone, email, brand_name}),});

      const data = await response.json();
      console.log('Response:', data); // Log the response data

      if (response.ok) {
        // navigate('/login');
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

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    // navigate('/login');
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

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    registerSeller,
  };

  useEffect(() => {
    if (authTokens) {
      try {
        setUser(jwtDecode(authTokens.access));
      } catch (error) {
        console.error('Invalid token', error);
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
