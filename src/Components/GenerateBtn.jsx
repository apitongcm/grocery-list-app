import { Button } from '@/components/ui/button'
import React from 'react'

function GenerateBtn({setSelectedItems, selectedItems}) {
  
  //Generate the optimized grocery list and display the list
  const handleGenerateTextFile = () => {

  //Safe guard that will catch error if the array is empty
  if (!selectedItems || selectedItems.length === 0) {
    alert("Basket is empty!");
    return;
  }}


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
     setSelectedItems([]) 
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