import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router';
import {getErrorMessage} from '../services/firebaseErrors';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const {signup, loginWithGoogle} = useAuth();

    const navigate = useNavigate();

    const [errorMessage,setErrorMessage] = useState("");

    const handleEmailSignup = async (e) => {
      e.preventDefault();
      try{
        await signup(email,password);
        navigate("/calendar");
      } catch (error) {
        setErrorMessage(getErrorMessage(error.code));
        console.log(error.code);
      }
    };

    const handleGoogleSignup = async () => {
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
        <h2 className='text-3xl font-extrabold text-center mb-6 text-indigo-600'>Create Account</h2>
        <div className='space-y-5'>
          <div className='flex flex-col space-y-1'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input required type="email" className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-indigo-500 bg-gray-50'
                onChange={(e) => setEmail(e.target.value)}
              />
              
          </div>
          <div className='flex flex-col space-y-1'>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input required type="password" className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-indigo-500 bg-gray-50'
                onChange={(e) => setPassword((e.target.value))}  
              />
              
          </div>
            {
              errorMessage && (
                <p className='text-red-600 text-sm font-medium text-center'>{errorMessage}</p>  
              )
            }
          <button className='w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm font-semibold'
            onClick={handleEmailSignup}
          
          >
            Signup
          </button>

          <p className='text-sm text-center mt-4'>
            Already have an account?{" "}
            <Link to="/login" className='text-indigo-600 hover:underline font-medium'>
            Login
            </Link>
          </p>
          <div className='flex items-center my-6'>
            <div className='grow border-t border-gray-300'></div>
              <span className='px-3 text-gray-500 text-sm font-medium'>OR</span>
            <div className='grow border-t border-gray-300'></div>
          </div>

          <button className='w-full flex items-center justify-center gap-3 rounded-lg border py-2 bg-white hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm'
            onClick={handleGoogleSignup}
          >
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google" 
              className='w-5 h-5'  
            />
            <span className='text-gray-700 font-medium'>Signup with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;