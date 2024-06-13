import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import authApi from './api/auth/auth';
import { login, logout } from './store/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authApi.currentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        console.log("no user")
        dispatch(logout())
      }
    })
    
  },[])

  return (
    <>
    <div>

      <Navbar />
      <Outlet />
    </div>
    </>
  )
}

export default App
