import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";



function ModalWindow({isDialogOpen, setIsDialogOpen, setQuery,setresponseFlag, handleAddCard, firstMatch}) {

    if (!firstMatch) return;

    const handleButtonClick = () => {
        setQuery(""); // Clear input
        setresponseFlag(false) //Return flag to false
        
    };

  return (
    <>
     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Item Validation Check</DialogTitle>
            <DialogDescription>
              We kindly request your confirmation on whether the following item is correct.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Item: {firstMatch.name}</Label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Price: ₱ {firstMatch.price} </Label>
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                  <Button type="submit"
                  className="bg-green-900 hover:bg-green-300 hover:text-black"
                  onClick={handleAddCard}
                  >Add to List</Button>
            </DialogClose>
            <DialogClose asChild>
                  <Button variant="outline" className="hover:bg-green-300" onClick={handleButtonClick}>Retry</Button>
            </DialogClose>
            
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

    </>
  )
}

export default ModalWindow