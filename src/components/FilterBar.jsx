import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveGenre,
  selectSearchQuery,
  setActiveGenre,
  setSearchQuery,
} from "../features/books/booksSlice";

const GENRES = ["All", "Classics", "Philosophy", "Sci-Fi", "Dystopian"];

export default function FilterBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const activeGenre = useSelector(selectActiveGenre);

  return (
    <div className="mb-12 space-y-6">
      <div className="relative max-w-xl">
        <svg
          width="16"
          height="16"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => dispatch(setSearchQuery(event.target.value))}
          placeholder="Search by title or writer..."
          aria-label="Search books by title or writer"
          className="w-full rounded-xl border border-zinc-800 bg-[#14171d] py-3 pl-11 pr-4 font-sans text-sm text-zinc-200 placeholder-zinc-500 transition-all focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Genres:
        </span>
        {GENRES.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => dispatch(setActiveGenre(genre))}
            aria-pressed={activeGenre === genre}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeGenre === genre
                ? "border-amber-400 bg-amber-400 font-semibold text-zinc-950 shadow-md shadow-amber-400/10"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
