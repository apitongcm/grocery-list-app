import { Button } from '@/components/ui/button'
import { useNavigate } from "react-router-dom";
import React from 'react'

function GenerateBtn({setSelectedItems, selectedItems, setBudget, budget}) {
  
  const navigate = useNavigate();

  //Generate the optimized grocery list and display the list
 const handleGenerateTextFile = async () => {

  //Safe guard that will catch error if the array is empty
  if (!selectedItems || selectedItems.length === 0) {
    alert("Basket is empty!");
    return;
  }

   try {

    // Get API base URL from environment variable
    const apiUrl = import.meta.env.VITE_API_URL;
    //fetch("http://localhost:5000/api/receive_data") local server
    const response = await fetch(`${apiUrl}/api/receive_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: selectedItems,
        budget: budget,
      }),
    });


    const result = await response.json();
    // Debug: checking of response from flask
    console.log("Response from Flask:", result);

    //Access the shuffled_items
    console.log("Shuffled Items:", result.shuffled_items);
    localStorage.setItem("selectedItems", JSON.stringify(result.shuffled_items));


    // navigate or display result
    navigate("/loading");
  } catch (error) {
    console.error("Error posting data:", error);
  }
};


  return (
    <>
    <div className='lg:w-5/8 flex mx-auto mt-2 md:w-2/3'>

    {/*Generate optimize list */}
    <Button
    id ="generatebtn"
    type="submit"
    onClick={handleGenerateTextFile}
    className="w-full py-8 bg-gray-200 text-black  font-semibold text-xl hover:bg-green-300 md:text-2xl">
        Generate
    </Button>
    </div>

    <div className='lg:w-5/8 flex mx-auto mt-2 md:w-2/3'>
    {/*Clear Grocery List */}
    <Button
    onClick={()=>{
     setSelectedItems([]),
     setBudget([])
    }}
    id ="clearbtn"
    className="w-full py-8 bg-green-900 text-white font-semibold text-xl hover:bg-green-300 hover:text-black md:text-2xl">
        Clear
    </Button>

    </div>
    </>
  )
}

export default GenerateBtn