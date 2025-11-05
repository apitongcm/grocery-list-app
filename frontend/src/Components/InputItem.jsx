import React from 'react';
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ModalWindow from './ModalWindow';
import GenerateBtn from './GenerateBtn';
import ItemHolder from './ItemHolder';




function InputItem() {

  //temporary API for search
  const [miniDB_items, setMiniDBItems] = useState([]);  // start empty
  const [found, setFound] = useState(null);

    //Input item manipulation
    const [query, setQuery] = useState("");
    const [firstMatch, setFirstMatch] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [priority, setPriority] = useState(0);

    //For Validation check
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [responseFlag, setresponseFlag] = useState(false);
    const[budget,setBudget] = useState("")

     useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((res) => res.json())
      .then((data) => setMiniDBItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (miniDB_items.length > 0 && query.trim() !== "") {
      const found = miniDB_items.find((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFound(found);
    } else {
      setFound(null);
    }
  }, [query, miniDB_items]);

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

    
    if (!found) {
          //if Input not match with the elements inside the database
          alert("Item not found")
          setresponseFlag(false);
          setQuery(''); 
    } else {
          //if Input match
          setFirstMatch(found) 
          setresponseFlag(true);
    }
    setQuery('');  // clear input field
    }

    // Check if the input is numeric or empty (allow clearing)
    const handleBudgetChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]*$/.test(value)) {
      setBudget(value);
    } else {
      alert('Please enter numbers only.')
    }
  };

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
    <div className='lg:w-5/8 mt-10 mx-auto md:w-2/3 '>
 
        {/* Input Field */}
        <input
        id="inputitem"
        type="text"
        value={budget}
        onChange={handleBudgetChange}
        placeholder="Enter your Budget"
        className="block w-full pl-5 pr-4 border border-gray-300  text-gray-500  focus:text-black focus:outline-none py-3 text-xl"
        />
    </div>
    <div className='lg:w-5/8 flex mx-auto mt-5 md:w-2/3'>
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
        className="block w-full pl-5 pr-4 py-2 border border-gray-300  text-gray-500  focus:text-black focus:outline-none text-xl"
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
                  budget={budget}
                  setBudget={setBudget}
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