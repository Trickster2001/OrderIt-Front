import React from 'react'
import authApi from '../api/auth/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

const LogOutBtn = () => {
  
    const dispatch = useDispatch()
  
    const logOut = () => {
      authApi.logout().then(()=>{
        dispatch(logout())
      })
    }
  
    return (
      <button onClick={logOut} className='bg-red-600 text-white py-2 px-4 rounded-lg'>Sign Out</button>
    )
  }
  
  export default LogOutBtn