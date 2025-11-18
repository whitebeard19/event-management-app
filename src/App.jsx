import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthProvider from './auth/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';
import Home from './components/Home';

const App = () => {

  return (
    <>
    <AuthProvider>
        <Outlet/>
    </AuthProvider>
    </>
  )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><Home/></ProtectedRoute>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/signup",
                element: <SignUp/>,
            },
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>)

