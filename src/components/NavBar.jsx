import React from 'react'
import { useAuth } from '../auth/AuthContext'

const NavBar = () => {

    const {logout, currentUser} = useAuth();


  return (
    <div 
        className='w-full 
        bg-linear-to-r from-indigo-600 to-purple-600 
        px-6 py-4 
        flex items-center justify-between 
        shadow-lg shadow-indigo-300/30'>
        
        <h1
            className='text-2xl font-bold text-white tracking-wide drop-shadow-sm'
        >Event Management App</h1>
        <h1
            className='text-lg font-medium text-indigo-50'    
        >
            {currentUser?.email}'s Workspace
        </h1>
        <button
            onClick={logout}
            className='px-4 py-2 
                    bg-white text-indigo-700 font-semibold 
                    rounded-md 
                    shadow-sm hover:shadow-md 
                    hover:bg-indigo-50 
                    transition-all'
        >
            Logout
        </button>

    </div>
  )
}

export default NavBar;