import { useSelector } from "react-redux";
import { selectFavorites } from "../features/books/booksSlice";
import logo from "../assets/logo.png";

export default function Navbar() {
  const favorites = useSelector(selectFavorites);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0d0f12]/80 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AYUBOOKS logo"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>READLIST</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-zinc-800 text-amber-400 font-bold">
              {favorites.length}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}