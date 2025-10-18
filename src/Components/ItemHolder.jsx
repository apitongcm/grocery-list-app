
import React from 'react';
import ItemCard from './ItemCard'

function ItemHolder({selectedItems, setSelectedItems}) {

  const handleDeleteCard = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className='mt-25 mx-auto min-lg:w-1/2 max-md:mx-0 '>
        <h1 className='text-center font-semibold text-2xl md:text-3xl'>Basket</h1>
              {selectedItems.map((item) => (
        <ItemCard 
            key={item.id}
            id={item.id}
            handleDeleteCard={handleDeleteCard}
            item_name={item.name} 
            item_price={item.price}/>
      ))}
    </div>
    </>
  )
}

export default ItemHolder