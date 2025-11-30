import { HiOutlineLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="backdrop-blur-sm shadow-md flex items-center justify-between 
      w-full h-20 px-20 md:px-36 lg:px-46 fixed top-0 z-50 bg-black/10">

      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <div className="p-2 bg-black/50 rounded-lg">
          <HiOutlineLightningBolt color="white" />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold">
          Deal<span className="text-blue-400">Finder</span>
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-4">
        <Link
          to="/categories"
          className="px-4 py-2 bg-blue-400 text-white rounded-lg"
        >
          Categories
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 bg-black/40 rounded-lg"
      >
        {open ? <HiOutlineX size={24} color="white" /> : <HiOutlineMenu size={24} color="white" />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-20 right-0 w-full bg-black/50 backdrop-blur-md py-4 flex flex-col items-center gap-4 md:hidden">

          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-blue-400 text-white rounded-lg w-40 text-center"
          >
            Categories
          </Link>
        </div>
      )}
    </nav>
  );
}
