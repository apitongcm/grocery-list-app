import React from 'react';
import { useState } from "react";

function BudgetEntry() {
    const[budget,setBudget] = useState(0)

  return (
    <>
    <div className='lg:w-5/8 flex mx-auto mt-10 md:w-2/3'>
     {/* Input Budget */}

        {/* Input Field */}
        <input
        id="inputitem"
        type="text"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter your Budget"
        className="block w-full pl-5 pr-4 border border-gray-300  text-gray-400  focus:text-black focus:outline-none py-8"
        />
        
        {/* Update budget */}
        <button 
        className="relative px-4  bg-gray-200 flex items-center hover:bg-green-300 focus:outline-none py-8"
        aria-label="Search"
        > 
          Update
        </button>
        </div>
    </>
    
  )
}

export default BudgetEntry