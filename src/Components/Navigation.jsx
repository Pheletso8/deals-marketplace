import { Sparkles, Menu, X, LayoutGrid, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/download.avif"

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass-dark fixed top-0 w-full h-20 px-6 md:px-12 lg:px-24 z-50 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-brand-primary/20 rounded-xl group-hover:scale-110 transition-transform overflow-hidden">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Deal<span className="text-brand-primary font-black">Finder</span>
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {/* Search Icon/Tool */}
        <button className="p-2 text-gray-300 hover:text-white transition-colors">
          <Search size={20} />
        </button>
        
        <Link
          to="/categories"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium"
        >
          <LayoutGrid size={18} />
          Categories
        </Link>
        <Link
          to="/"
          className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-full font-semibold transition-all shadow-lg shadow-brand-primary/20"
        >
          Dashboard
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        {open ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-20 left-0 w-full glass-dark py-8 flex flex-col items-center gap-6 md:hidden animate-in slide-in-from-top-4 duration-300">
          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="text-lg font-medium text-gray-300 hover:text-white"
          >
            Categories
          </Link>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold w-48 text-center"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}