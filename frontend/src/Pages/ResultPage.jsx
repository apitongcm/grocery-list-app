import Header from '@/Components/Header'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  
   useEffect(() => {

    document.title = "Balaklon-Grocery-List";

   
    //Get Items to display in the page from the flask.
    const storedData = JSON.parse(localStorage.getItem("selectedItems")) || [];


    const withId = storedData.map((item, index) => ({
      ...item,
      id: index + 10000,
    }));
    setItems(withId);
  }, []); 

    //Download generated grocery list in .txt format
    const handleDownload = () => {

     // Convert array data to CSV format
    const header = "Balaklon-Grocery-List\n\n";
    const csvHeader = "Name,Price\n";//column headers
    const csvRows = items.map(item => `${item.name},${item.price}`).join("\n");
    const content = header + csvHeader + csvRows;

     // Convert data format to CSV
     const blob = new Blob([content], { type: "text/csv" });

      // temporary url to place data
      const url = URL.createObjectURL(blob);

      // headless manuever and processing to perform/trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "Balaklon-Grocery-List_result.csv"
      a.click();

      // since the data is downloaded revoke the temporary URL.
      URL.revokeObjectURL(url);
    };

 //Catch changes in the status of every checkbox created
 const handleCheckboxChange = (result_id) => {
    setItems((withId) =>
      withId.map((item) =>
        item.id === result_id? { ...item, checked: !item.checked } : item
      )
    );
  };
    //Return to Home
    const returnHome = () => {
            navigate("/");
            localStorage.removeItem("selectedItems");
            window.location.reload();
    }

  return (
    <>
    <Header/>
    <div className='container mx-auto px-15 py-6 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'>
      <h1 className="mb-10 text-center font-semibold text-2xl md:text-3xl">
        Optimized Grocery List   
    </h1>
       <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={item.id || index}
            className="bg-gray-100 px-6 py-3 rounded-lg shadow-sm w-full text-center flex gap-6 lg:w-5/8 mx-auto mt-2 md:w-2/3"
          >

            
             <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.checked || false}
                onChange={() => handleCheckboxChange(item.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
             </div>
             <div className='sm:flex gap-5'>
                <p
                  className={`font-semibold text-gray-800 text-left md:text-center ${
                    item.checked ? "line-through text-red-400" : ""
                  }`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-gray-500 text-md text-left md:text-center ${
                    item.checked ? "line-through text-red-500" : ""
                  }`}
                >
                    ₱{item.price}
                </p>
              </div>
          </li>
        ))}
      </ul>
         <div className='mt-10'>
            <Button
                onClick={handleDownload}
                className="lg:w-5/8 w-full flex py-8 mx-auto mt-2 md:w-2/3 bg-gray-200 text-black hover:bg-green-300"
            >Download</Button>
            <Button
                onClick={returnHome}
                className="lg:w-5/8 w-full flex py-8 mx-auto mt-2 md:w-2/3 bg-green-900 text-white hover:bg-green-300 hover:text-black"
            >New List</Button>
         </div>
    </div>
    </>
  );
}
