import React from 'react'

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-gray-800"></div>
    </div>
  )
}

export default Loader