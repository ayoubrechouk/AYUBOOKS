import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BookOpen, Download, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { books, getBookById } from "../data/books";

export default function BookDetails() {
  const { id } = useParams();
  const book = getBookById(id);

  if (!book) {
    return <NotFound />;
  }

  const relatedBooks = books.filter(
    (relatedBook) => relatedBook.genre === book.genre && relatedBook.id !== book.id,
  ).slice(0, 6);
  const downloadContents = `${book.title}\nby ${book.author}\n\n${book.description}\n\nAYUBOOKS sample edition.`;
  const downloadHref = `data:text/plain;charset=utf-8,${encodeURIComponent(downloadContents)}`;

  return (
    <div className="min-h-screen overflow-hidden bg-[#fff9ed] text-[#34164c]">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-[1440px] px-5 pt-7 sm:px-8 lg:px-12">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#806d83] transition hover:text-[#f18420]">
            <ArrowLeft size={14} /> Back to the shelf
          </Link>
        </div>
        <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 lg:px-20 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -36, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 85 }}
            className="relative mx-auto w-full max-w-[25rem]"
          >
            <div className="absolute -inset-4 rotate-6 rounded-[2.4rem] border border-[#5ad8a6]/55" />
            <motion.img
              whileHover={{ rotateY: 7, rotateX: -4, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              src={book.posterUrl}
              alt={`Cover art for ${book.title}`}
              className="relative aspect-[0.72] w-full rounded-[2rem] border-[10px] border-white object-cover shadow-[0_35px_80px_-28px_rgba(52,22,76,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            />
            <span className="absolute -bottom-4 -right-3 rotate-6 rounded-full bg-[#5ad8a6] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#204832] shadow-lg">
              {book.genre} / {book.year}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f18420]">
              <Sparkles size={13} /> The story behind the cover
            </p>
            <h1 className="max-w-3xl font-serif text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              {book.title}
            </h1>
            <p className="mt-5 font-serif text-xl italic text-[#765f7a]">by {book.author}</p>
            <div className="my-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-[#34164c]/15 py-4 font-mono text-[9px] uppercase tracking-[0.17em] text-[#8b7b89]">
              <span>{book.genre}</span><span>{book.year}</span><span>{book.pages} pages</span>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#705f74] sm:text-lg">{book.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04, rotate: -1 }} whileTap={{ scale: 0.97 }}>
                <Link to={`/read/${book.id}`} className="inline-flex items-center gap-3 rounded-full bg-[#34164c] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#34164c]/15 transition-colors hover:bg-[#f18420] hover:text-[#34164c]">
                  <BookOpen size={16} />                   Read
                </Link>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.04, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                href={downloadHref}
                download={`${book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-sample.txt`}
                className="inline-flex items-center gap-3 rounded-full border border-[#34164c]/20 bg-white/60 px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#34164c] transition-colors hover:border-[#f18420] hover:bg-[#fff1d2]"
              >
                <Download size={16} /> Download
              </motion.a>
            </div>
          </motion.div>
        </section>

        {relatedBooks.length > 0 && (
          <section className="bg-[#f2eadc] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#34164c]/15 pb-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#f18420]">Same shelf, same spell</p>
                  <h2 className="mt-2 font-serif text-3xl font-black tracking-[-0.05em] sm:text-4xl">More {book.genre.toLowerCase()} to get lost in.</h2>
                </div>
                <Link to="/" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#705977] hover:text-[#f18420] sm:inline-flex">
                  All books <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {relatedBooks.map((relatedBook, index) => (
                  <BookCard key={relatedBook.id} book={relatedBook} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fff9ed] px-6 text-center text-[#34164c]">
      <h1 className="font-serif text-5xl font-black">This book wandered off.</h1>
      <p className="mt-4 text-[#705977]">That title is not on our shelves yet.</p>
      <Link to="/" className="mt-8 rounded-full bg-[#34164c] px-6 py-3 font-mono text-xs uppercase tracking-widest text-white">Return home</Link>
    </div>
  );
}
