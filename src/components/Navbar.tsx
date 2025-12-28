export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight text-slate-800">
          Detox <span className="text-primary-600">Juice</span>
        </div>
        <div className="space-x-4 text-sm font-medium text-slate-600 hidden md:block">
          <a href="#" className="hover:text-primary-600 transition-colors">Recipes</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Benefits</a>
          <a href="#" className="hover:text-primary-600 transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}
