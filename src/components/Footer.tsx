export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 mt-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© 2025 Detox Juice. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
