import React, { useState } from 'react'
import LogOutBtn from './LogOutBtn';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus)

  const userData = useSelector((state) => state.auth.userData);
  if(userData && userData?.isAdmin) {
    console.log("user is admin")
  } else {
    console.log("user is not admin")
  }
  const adminStatus = userData?.isAdmin;

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Orders",
      slug: "/allOrders",
      active: authStatus
    },
    {
      name: "Add Dish",
      slug: "/addDish",
      active: adminStatus
    }
  ]

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className='bg-white sticky top-0  z-0 font-semibold text-black border border-b shadow-md p-4 py-5 flex justify-between items-center sm:px-8'>
      <div className='text-2xl text-orange-500 px-2'>OrderIt</div>
      <div className='sm:hidden text-xl cursor-pointer text-orange-500' onClick={toggleMenu}>Menu</div>
      <div className='hidden sm:block'>
      <ul className='flex gap-7 items-center'>
      {navItems.map((item) => 
      item.active ? (
        <li className='text-lg font-semibold' key={item.slug}>
        <button onClick={()=>navigate(item.slug)}>{item.name}</button>
        </li>
      ) : null
    )}
      <li>
        {
          authStatus && 
          <LogOutBtn />
        }
      </li>
      </ul>
        </div>
    </nav>
    {isOpen ? (<div className='bg-white sm:hidden transition delay-150 duration-300 ease-in-out h-[50vh] p-5 fixed top-[64px]  right-0 left-0 z-10 border border-blue-400'>
    <ul>
      {navItems.map((item) => 
      item.active ? (
        <li className='font-semibold shadow-md text-xl list-inside list-disc m-5 border-b mb-10' key={item.slug}>
        <button onClick={()=>{
          setIsOpen(false)
          navigate(item.slug)}}>{item.name}</button>
        </li>
      ) : null
    )}
      <li className='m-5'>
        {
          authStatus && 
          <LogOutBtn />
        }
      </li>
      </ul>

    </div>) : ""}
    </>
  )
}

export default Navbar