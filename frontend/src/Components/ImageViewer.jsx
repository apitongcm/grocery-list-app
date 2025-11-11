import React from 'react'
import productList from "../assets/pricelist_ref.jpg"

function ImageViewer() {
  return (
   <div className="flex justify-center items-center w-full bg-gray-50 p-2 sm:p-4">
      <div className='w-full max-w-md sm:max-w-lg md:max-w-3xl'>
          <img
            src={productList}
            alt="PDF view"
            className="w-full max-w-full h-auto rounded-xl shadow-md object-contain"
          />
      </div>
    </div>
  )
}

export default ImageViewer