import Header from "@/Components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingCart() {
    
    const navigate = useNavigate();

  //Creates buffer time before displaying result from Python.
  useEffect(() => {
    document.title = "Processing...";

    //Alloted time buffer for heavy calculation (3seconds)
    const timer = setTimeout(() => {

      //Pending: 
      //localStorage.setItem("generatedData", JSON.stringify(generatedData));

      // Navigate to optimized grocery list result (Knapsack Algorithm output) 
      navigate("/result");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>    <Header/>
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="relative w-34 h-34">

        {/* Outer rotating ring animation*/}
        <div className="absolute inset-0 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

        {/* Cart emoji in center */}
        <div className="absolute inset-3 flex items-center justify-center text-4xl animate-pulse">
          🛒
        </div>
      </div>

      {/* Loading message */}
      <p className="mt-6 text-gray-700 text-lg font-semibold tracking-wide animate-pulse">
        Optimizing grocery list, please wait...
      </p>
    </div>
    </>
  );
}
