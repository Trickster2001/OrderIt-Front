import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dish = ({dish}) => {
    // xl:w-[30vw] 2xl:w-[30vw]

  return (
    <>
        <div className="w-[90vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] xl:w-[30vw] 2xl:w-[25vw] rounded shadow-lg m-4 bg-white">
      <img
        className="w-full h-64 object-contain"
        // src={dish.dishImage}
        src={dish.dishImage}
        alt={dish.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{dish.title}</div>
        <p className="text-gray-600 text-base">${dish.price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/singleDish/${dish._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check
        </button>
        </Link>
      </div>
    </div>

    
    </>
  )
}

export default Dish