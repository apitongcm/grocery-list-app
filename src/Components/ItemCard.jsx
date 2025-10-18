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

function ItemCard({id,handleDeleteCard,item_name,item_price}) {


  return (
   <div className="mt-5"> 
        <Card>
            <CardHeader>
                <CardTitle className="text-xl md:text-md">{item_name}</CardTitle>
                <CardDescription className="text-xl md:text-md">₱ {item_price.toLocaleString()}</CardDescription>
                <CardAction>
                    <Button 
                      onClick={() => handleDeleteCard(id)}
                      className="bg-red-500 hover:bg-green-500">
                      <Trash2 size={20} />
                    </Button>

                </CardAction>
            </CardHeader>
        </Card>
   </div>
  )
}

export default ItemCard