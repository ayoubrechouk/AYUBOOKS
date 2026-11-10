import { useDispatch, useSelector } from "react-redux";
import { setPDFReaderOpen, selectActiveBook } from "../features/books/booksSlice";

export default function PDFReaderModal() {
  const dispatch = useDispatch();
  const book = useSelector(selectActiveBook);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0d10] flex flex-col">
      {/* Top Bar Navigation */}
      <div className="h-16 border-b border-zinc-800 bg-[#12141a] px-6 flex items-center justify-between">
        <div>
          <h2 className="text-zinc-100 font-serif font-bold text-sm sm:text-base">
            {book.title}
          </h2>
          <p className="text-xs text-zinc-400 font-sans">{book.writer}</p>
        </div>

        <button
          onClick={() => dispatch(setPDFReaderOpen(false))}
          className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-3.5 py-1.5 rounded-lg border border-zinc-700 transition-colors"
        >
          <span>ESC / CLOSE READER</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Reader Container */}
      <div className="flex-1 w-full bg-[#1e2025] flex justify-center items-center">
        {/*
          =======================================================
          // TODO: ADD PDF VIEWER / FILE PATH HERE
          - Option A: Native iframe or object embed (configured below with fallback).
          - Option B: Integrate 'react-pdf' (pdfjs) or '@react-pdf-viewer/core'.
          - Replace `book.pdfUrl` with your actual digital asset path.
          =======================================================
        */}
        <object
          data={book.pdfUrl}
          type="application/pdf"
          className="w-full h-full border-none shadow-inner"
        >
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <p className="text-zinc-300 font-serif mb-4 text-lg">
              Unable to display the PDF directly in this frame.
            </p>
            {/* 
              // TODO: ADD DOWNLOAD PDF LINK HERE 
            */}
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Open or Download PDF directly
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}