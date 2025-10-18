
import { MoreVertical } from "lucide-react";
import logo from "../assets/logo.png";
import balaklon from "../assets/brand.png";

function Header() {
  return (
     <header className="w-full flex items-center justify-between bg-white shadow-md px-4 py-3 sticky top-0 z-50 ">
      {/* Insert Logo */}
      <div className="flex mx-5 items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-25 w-25 bg-white"
        />

        <img
          src={balaklon}
          alt="balaklon"
          className="h-15 w-40 bg-white md:w-60 md:h-25"
        />
      </div>

      {/* Right: Triple-dot Icon */}
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Options"
      >
        <MoreVertical className="h-6 w-6 text-gray-700" />
      </button>
    </header>
  );
}

export default Header