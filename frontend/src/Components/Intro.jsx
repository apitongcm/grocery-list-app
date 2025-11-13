import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ImageViewer from "./ImageViewer"


function Intro() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        {/*Brief Explanation of the Application*/}
        <div id="Overview_Text">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Grocery List App
            </h1>
            <p className="text-gray-600 mt-3 text-md md:text-xl">
                Plan smarter, shop better. This app uses the Knapsack algorithm to select the best combination of grocery items that maximizes value while staying within your budget. Save money and get the most out of every shopping trip.
            </p>
        </div>
        <div id="Dropdown_Help">
            {/*Dropdown Help Assistance */}
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl md:mt-10">
                    How to use?
                </h1>
            </AccordionTrigger>
            <AccordionContent>
                   <div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-md md:text-lg">
                            <li>Enter the item name and click search icon to look for the item.</li>
                            <li>The app will display a matching item with its description and price.</li>
                            <li>Confirm if the item is correct:
                                <p className="pl-12">Case 1: If correct, it will be added in the list.</p>
                                <p className="pl-12">Case 2: If incorrect, re-enter a more specific item name.</p>
                            </li>
                            <li>The first item added will be the highest rank based on priority.</li>
                            <li>When finished, press "Generate" to run the knapsack algorithm and get an optimized grocery list.</li>
                            <li>for the product list kindly refer to the image or visit <a href="https://dtiwebfiles.s3.ap-southeast-1.amazonaws.com/e-Presyo/SRP+Basic+Necessities+and+Prime+Commodities/2025/BNPC+SRP+BULLETIN+01+FEBRUARY+2025.002.pdf" target="_blank" className="text-red-500">DTI Price Bulletin</a></li>
                        </ul>
                   </div>
                   <ImageViewer/>
            </AccordionContent>
        </AccordionItem>
        </Accordion>
        </div>
    </div>
  )
}

export default Intro