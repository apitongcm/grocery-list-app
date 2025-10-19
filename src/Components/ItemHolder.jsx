
import React from 'react';
import ItemCard from './ItemCard'
import { useRef} from "react";


function ItemHolder({selectedItems, setSelectedItems}) {
  const draggedIndexRef = useRef(null);

  //************************************************ */
  //Delete item in the basket

  const handleDeleteCard = (index) => {
  setSelectedItems((prev) => {
    //Remove the target item
    const filtered = prev.filter((_,item) => item && item.id !== index);

    // Reassign sequential IDs for safe executions of loops
    const reindexed = filtered.map((item, newIndex) => ({
      ...item,
      id: newIndex, 
    }));

    return reindexed;
  });

  //Reset to avoid using outdated index as reference
  draggedIndexRef.current = null;
};


  const handleDrop = (dropIndex) => {
        const draggedIndex = draggedIndexRef.current;
    
         if (draggedIndex === null || draggedIndex < 0) return;
        const updated = [...selectedItems];

        if (draggedIndex >= updated.length || dropIndex >= updated.length) {
            console.warn("Invalid drag or drop index; operation cancelled.");
            draggedIndexRef.current = null;
            return;
        } 

        const [movedCard] = updated.splice(draggedIndex, 1);
        
          if (!movedCard) {
              console.warn("Dragged item no longer exists; aborting move.");
              return;
          }
        
        updated.splice(dropIndex, 0, movedCard);
        setSelectedItems(updated);
        draggedIndexRef.current = null;
        console.log("Updated order:", updated);
  };


  return (
    <>
      <div className='mt-25 mx-auto min-lg:w-1/2 max-md:mx-0 '>
        <h1 className='text-center font-semibold text-2xl md:text-3xl'>Basket</h1>
              {selectedItems.map((item,index) => (
        <ItemCard
            key={item.id}
            draggedIndexRef={draggedIndexRef}
            handleDrop={handleDrop}
            index={index}
            handleDeleteCard={handleDeleteCard}
            item={item} 
        />
      ))}
    </div>
    </>
  )
}

export default ItemHolder