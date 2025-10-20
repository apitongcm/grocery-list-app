import React from 'react';
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ModalWindow from './ModalWindow';
import GenerateBtn from './GenerateBtn';
import ItemHolder from './ItemHolder';



function InputItem() {

  //temporary API for search
    const [miniDB_items] = useState([
    { id: 1, name: 'Starbucks Double Shot Mocha | 220ml', price: 89.50 },
    { id: 2, name: 'Selecta Filled Milk Low Fat Save 30 | 1L 2pcs', price: 150.25 },
    { id: 3, name: 'SM Bonus Fresh Eggs | 12pcs', price: 117.00 },
    { id: 4, name: 'Lucky Me Instant Pancit Canton Chilimansi | 80g 6', price: 84.00 },
    { id: 5, name: 'Del Monte Juice Pineapple Heart Smart | 1L', price: 130.50 },
  ]);


    //Input item manipulation
    const [query, setQuery] = useState("");
    const [firstMatch, setFirstMatch] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [priority, setPriority] = useState(0);

    //For Validation check
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [responseFlag, setresponseFlag] = useState(false);


    useEffect(() => {
    if (responseFlag) {
      setIsDialogOpen(true);
    }
    }, [responseFlag]);   

    //************************************************ */
    //Searching the item
   const handleSearch = () =>{

      if (query.trim() === '') {
      alert('Search input is empty');
      return;
      }

    
  const match = miniDB_items.find((miniDB_item) =>
      miniDB_item.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (!match) {
          //if Input not match with the elements inside the database
          alert("Item not found")
          setresponseFlag(false);
          setQuery(''); 
    } else {
          //if Input match
          setFirstMatch(match) 
          setresponseFlag(true);
    }
    setQuery('');  // clear input field
    }

    //************************************************ */
    //Add item to basket
    const handleAddCard = () => {
    setSelectedItems((prev) => [...prev, 
        {
          ...firstMatch,
          id: priority, //to create new unique id
        }]);
    setPriority(priority + 1)
    setQuery(""); // Clear input
    setresponseFlag(false) //Return flag to false
  };

  return (
    <>
    <div className='lg:w-5/8 flex mx-auto mt-10 md:w-2/3'>
        {/* Input Item in the list */}

        {/* Input Field */}
        <input
        id="inputitem"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
              if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
              }}}
        placeholder="Enter an Item"
        className="block w-full pl-5 pr-4 py-2 border border-gray-300  text-gray-500  focus:text-black focus:outline-none text-3xl"
        />
        
        {/* Search Icon */}
        <button 
        onClick={() => handleSearch()}
        className="relative px-4 py-3 bg-gray-200 flex items-center hover:bg-green-300 focus:outline-none"
        aria-label="Search"
        > 
          <Search id="searchbtn" className="h-5 w-5 text-black" />
        </button>
    </div>
              <GenerateBtn
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
              />
                  

                {/* Pop up window */}
               <ModalWindow 
                  isDialogOpen={isDialogOpen} 
                  setIsDialogOpen={setIsDialogOpen}
                  setQuery={setQuery}
                  setresponseFlag={setresponseFlag}
                  handleAddCard={handleAddCard}
                  firstMatch={firstMatch}
                />
                   {/* Holds all the card(item) in your basket */}
              <ItemHolder 
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
              />
  </>
  )
}

export default InputItem