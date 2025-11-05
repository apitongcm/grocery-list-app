import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import logo from "../assets/logo.png";
import balaklon from "../assets/brand.png";

function Header() {
  const navigate = useNavigate();

  // State and refs should be declared at the top level
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Return to Home function
  const returnHome = () => {
    navigate("/");
    localStorage.removeItem("selectedItems");
    window.location.reload();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full flex items-center justify-between bg-white shadow-md px-4 py-3 sticky top-0 z-50">
        {/* Insert Logo */}
        <div className="flex mx-5 items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-25 w-25 bg-white cursor-pointer"
            onClick={returnHome}
          />

          <img
            src={balaklon}
            alt="balaklon"
            className="h-10 w-30 bg-white md:w-40 md:h-20"
          />
        </div>

        {/* Right: Triple-dot Icon */}
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Options"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MoreVertical className="h-6 w-6 text-gray-700" />
          </button>

          {/* Menu Card */}
          {isOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-0 w-65 bg-white border border-gray-200 shadow-xl rounded-2xl p-3 transition-all animate-fadeIn z-50"
            >
              <div className="flex flex-col space-y-2 text-gray-700">
                <h1>Contributors:</h1>
                <a href="https://ph.linkedin.com/in/apitongcm" target="_blank" className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                  💻 Carl Marwin Apitong
                </a>
                <a href="https://ph.linkedin.com/in/hakeem-jimenez-79b724128" target="_blank" className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                  ⚙️ Hakeem Jimenez
                </a>
                <a href="https://ph.linkedin.com/in/jason-john-violata-9a6200382" target="_black" className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                  📚 Jason John Violata
                </a>
                <a href="https://ph.linkedin.com/in/gio-albert-monta%C3%B1o-48642b29b" target="_blank" className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                  ✍🏻 Gio Albert Montaño
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
