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



    // Navigate to optimized grocery list result (Knapsack Algorithm output) 
      navigate("/result");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
   <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
        {/* Outer rotating ring animation */}
        <div className="absolute inset-0 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

        {/* Cart emoji in center */}
        <div className="absolute inset-3 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl animate-pulse">
          🛒
        </div>
      </div>

      {/* Loading message */}
      <p className="mt-6 text-gray-700 text-base sm:text-lg md:text-xl font-semibold tracking-wide animate-pulse leading-relaxed">
        Optimizing grocery list, please wait...
      </p>
    </div>
  </>
  );
}
