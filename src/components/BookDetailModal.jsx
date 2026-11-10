import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedBook,
  toggleFavorite,
  setPDFReaderOpen,
  selectFavorites
} from "../features/books/booksSlice";

export default function BookDetailModal({ book }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(book.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => dispatch(clearSelectedBook())}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl bg-[#101216] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 transition-all duration-300"
        style={{
          boxShadow: `0 25px 60px -15px ${book.accentColor}`
        }}
      >
        {/* Dynamic ambient color glow overlay */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] blur-3xl opacity-20 pointer-events-none -mr-20 -mt-20 rounded-full"
          style={{ backgroundColor: book.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={() => dispatch(clearSelectedBook())}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start relative z-10">
          {/* Cover Art Frame */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50">
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono px-3 py-1 rounded-md border ${book.badgeBg}`}>
                  {book.genre}
                </span>
                <span className="text-xs font-mono text-zinc-500">First published in {book.year}</span>
              </div>

              {/* Title & Writer (Author) */}
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-white mt-3 leading-tight tracking-tight">
                {book.title}
              </h1>
              <p className="text-lg text-amber-400/90 font-medium font-sans mt-1">
                Written by {book.writer}
              </p>

              {/* Specs & Pages */}
              <div className="flex items-center gap-6 mt-4 text-xs font-mono text-zinc-400 border-y border-zinc-800/80 py-3">
                <div>
                  <span className="text-zinc-500">PAGES:</span>{" "}
                  <span className="text-zinc-200 font-bold">{book.pages}</span>
                </div>
                <div>
                  <span className="text-zinc-500">FORMAT:</span>{" "}
                  <span className="text-zinc-200 font-bold">Hardcover / PDF</span>
                </div>
                <div>
                  <span className="text-zinc-500">LANGUAGE:</span>{" "}
                  <span className="text-zinc-200 font-bold">English</span>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-2">
                  Synopsis
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">{book.synopsis}</p>
              </div>
            </div>

            {/* Action Buttons & PDF Integration */}
            <div className="pt-4 flex flex-wrap gap-3 items-center">
              {/* PDF VIEWER ACTION BUTTON */}
              <button
                onClick={() => dispatch(setPDFReaderOpen(true))}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-amber-500/20 active:scale-95 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read Book
              </button>

              {/* 
                =======================================================
                // TODO: ADD DOWNLOAD PDF LINK HERE
                - Replace the href or bind an authenticated AWS S3 / Cloudinary signed URL
                - Ensure target="_blank" and download attribute are preserved
                =======================================================
              */}
              <a
                href={book.pdfUrl}
                download={`${book.title.replace(/\s+/g, "_")}.pdf`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium px-4 py-2.5 rounded-xl border border-zinc-700 transition-all text-sm"
              >
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>

              {/* Want to Read Toggle */}
              <button
                onClick={() => dispatch(toggleFavorite(book.id))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  isFavorite
                    ? "bg-rose-950/40 border-rose-800 text-rose-300"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "fill-none"}`}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? "In Readlist" : "Add to Readlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}