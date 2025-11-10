import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'

function ItemCard({index,handleDrop,draggedIndexRef,handleDeleteCard,item, handleTouchDrop}) {

      const handleDragStart = (index) => {draggedIndexRef.current = index;};
      const handleDragOver = (e) => e.preventDefault(); // preventing reseting data to default, to maintain data from drag start.


  return (
    
        <Card className="mt-5 cursor-grab active:cursor-grabbing hover:shadow-lg transition touch-pan-x select-none"
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
        onTouchMove={() =>handleTouchDrop(index)}
        >
            <CardHeader>
                <CardTitle className="text-xl md:text-md">{item.name}</CardTitle>
                <CardDescription className="text-xl md:text-md">₱ {item.price.toLocaleString()}</CardDescription>
                <CardAction>
                    <Button 
                      onClick={() => handleDeleteCard(index)}
                      className="bg-red-500 hover:bg-green-500">
                      <Trash2 size={20} />
                    </Button>

                </CardAction>
            </CardHeader>
        </Card>
  )
}

export default ItemCard