import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, Link } from 'react-router';
import { getErrorMessage } from '../services/firebaseErrors';

const Login = () => {

  const {login, loginWithGoogle} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try{
      await login(email,password);
      navigate("/calendar");
    }
    catch (error){
      setErrorMessage(getErrorMessage(error.code));
      console.log(error.code);
    }
  };

  const handleGoogleLogin = async () => {
    try{
      await loginWithGoogle();
      navigate("/calendar");
    }
    catch (error) {
      setErrorMessage(getErrorMessage(error.code));
    }
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-indigo-50'>
        <div className='bg-white shadow-xl shadow-indigo-100 rounded-2xl p-8 w-full max-w-md'>
          <h2 className='text-3xl font-extrabold text-center mb-6 text-indigo-600'>Login</h2>
          <div className='space-y-5'>
            <div className='flex flex-col space-y-1'>
                <label className='text-sm font-medium text-gray-700'>Email</label>
                <input type="email" className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-indigo-500 bg-gray-50'
                  onChange={(e) => setEmail(e.target.value)}
                />
                
            </div>
            <div className='flex flex-col space-y-1'>
                <label className='text-sm font-medium text-gray-700'>Password</label>
                <input type="password" className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-indigo-500 bg-gray-50'
                  onChange={(e) => setPassword(e.target.value)}
                />
                
            </div>
            {
              errorMessage && (
                <p className='text-red-600 text-sm font-medium text-center'>{errorMessage}</p>  
              )
            }
            <button className='w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm font-semibold'
              onClick={handleEmailLogin}
            >
              Login
            </button>
  
            <p className='text-sm text-center mt-4'>
              Don't have an account?{" "}
              <Link to="/signup" className='text-indigo-600 hover:underline font-medium'>
              Signup
              </Link>
            </p>

            <div className='flex items-center my-6'>
              <div className='grow border-t border-gray-300'></div>
                <span className='px-3 text-gray-500 text-sm font-medium'>OR</span>
              <div className='grow border-t border-gray-300'></div>
            </div>

            <button className='w-full flex items-center justify-center gap-3 rounded-lg border py-2 bg-white hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm'
              onClick={handleGoogleLogin}
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google" 
                className='w-5 h-5'  
              />
              <span className='text-gray-700 font-medium'>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default Login;