export default function Footer() {
  return (
    <footer className="bg-surface-950 border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Deal<span className="text-brand-primary font-black">Finder</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Premium Tech Deals Curated by AI.</p>
        </div>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-gray-600 text-xs">© 2026 DealPulse. Built for Excellence.</p>
      </div>
    </footer>
  );
}


