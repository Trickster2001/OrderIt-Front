import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AuthAdmin = ({children, authentication=true}) => {
  const authStatus = useSelector((state) => state.auth.userData.isAdmin);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if(authentication && authStatus !== authentication) {
      navigate("/login")
    } else if(!authentication && authStatus !== authentication){
      navigate("/")
    }
    setLoader(false);
  })
  return (
    loader ? "Loading" : <>{children}</>
  )
}

export default AuthAdmin