import Header from "@/Components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import balaklon from "../assets/brand.png";

export default function LoadingCart() {
    
    const navigate = useNavigate();

      //return to Home
  const returnHome = () => {
  navigate("/");
  localStorage.removeItem("selectedItems");
  window.location.reload();
  }

  //Creates buffer time before displaying the page.
  useEffect(() => {

    //Alloted time buffer for loading the page (3seconds)
    const timer = setTimeout(() => {


      // Navigate to home
      navigate("/home");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>    <Header/>
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="relative w-34 h-34">
        {/* Cart emoji in center */}
        <div className="absolute inset-3 flex items-center justify-center text-4xl animate-ping">
              <img
                    src={logo}
                    alt="Logo"
                    className="h-25 w-25 bg-white"
                    onClick={returnHome}
                  />
        </div>
      </div>
        <div className="mb-10">
             <img
                      src={balaklon}
                      alt="balaklon"
                      className="h-10 w-30 bg-white md:w-40 md:h-20"
                    />
        </div>

      {/* Loading message */}
      <p className="mt-6 text-gray-700 md:text-lg font-semibold md:tracking-wide animate-pulse xs:mt-4 xs:text-xs ">
        Cleaning up and reseting Cart, please wait...
      </p>
    </div>
    </>
  );
}
