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
        className="block w-full pl-5 pr-4 border border-gray-300  text-gray-500  focus:text-black focus:outline-none py-8 text-5xl"
        />
        
        </div>
    </>
    
  )
}

export default BudgetEntry