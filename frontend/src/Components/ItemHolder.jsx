
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
    const filtered = prev.filter((_,item) => item !== index);
    console.log(index)

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


  //************************************************ */
  //Change order/priority by drag and drop functionality
  const handleDrop = (dropIndex) => {
        const draggedIndex = draggedIndexRef.current;
    
         //Ignore if index is null or less than 0
         if (draggedIndex === null || draggedIndex < 0) return;
        const updated = [...selectedItems];

        //Safe guard that catches index is greated than the length of the array.
        if (draggedIndex >= updated.length || dropIndex >= updated.length) {
            console.warn("Invalid drag or drop index; operation cancelled.");
            draggedIndexRef.current = null;
            return;
        } 

        const [movedCard] = updated.splice(draggedIndex, 1);
        
        //Safe guard that catches error if current moved card does not exist in the array.
        if (!movedCard) {
              console.warn("Dragged item no longer exists; aborting move.");
              return;
          }
        //Implement the rearrange functionality
        updated.splice(dropIndex, 0, movedCard);
        setSelectedItems(updated);
        draggedIndexRef.current = null;
        console.log("Updated order:", updated);
  };

//********************************************************/
// Change order/priority by drag and drop functionality (Mobile View)
const handleTouchDrop = (e) => {
  e.preventDefault(); // prevent scroll during drag

  const draggedIndex = draggedIndexRef.current;
  if (draggedIndex === null || draggedIndex < 0) return;

  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!target || !target.dataset || target.dataset.index === undefined) return;

  const dropIndex = parseInt(target.dataset.index);
  if (isNaN(dropIndex)) return;

  const updated = [...selectedItems];

  // Safe guards
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
};

  return (
    <>
      <div className='mt-25 mx-auto min-lg:w-1/2 max-md:mx-0 '>
        <h1 className='text-center font-semibold text-2xl md:text-3xl'>Current Cart</h1>
              {selectedItems.map((item,index) => (
        <ItemCard
            key={item.id}
            index={index}
            item={item} 
             draggedIndexRef={draggedIndexRef}


            //For Desktop View 
            handleDrop={handleDrop}
            handleDeleteCard={handleDeleteCard}


            //For Mobile View 
            handleTouchDrop={handleTouchDrop}

        />
      ))}
    </div>
    </>
  )
}

export default ItemHolder