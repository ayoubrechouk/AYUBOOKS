import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Search, Sparkles } from "lucide-react";
import BookCard from "../components/BookCard";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { books, genres } from "../data/books";

export default function Home() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
      const matchesQuery =
        !normalizedQuery ||
        `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(normalizedQuery);
      return matchesGenre && matchesQuery;
    });
  }, [activeGenre, query]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fff9ed] text-[#34164c]">
      <SiteHeader />
      <main>
        <section className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-14 h-[27rem] w-[27rem] rounded-full border-[1px] border-[#5ad8a6]/40 sm:right-0">
            <div className="absolute inset-8 rounded-full border border-[#f18420]/30" />
            <div className="absolute inset-16 rounded-full bg-[#5ad8a6]/10" />
          </div>
          <div className="relative grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#34164c]/15 bg-white/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#705977]"
              >
                <Sparkles size={13} className="text-[#f18420]" />
                A library with a little personality
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                aria-label="AYUBOOKS"
                className="flex flex-wrap gap-x-3 font-serif text-[clamp(3.5rem,10vw,9.5rem)] font-black leading-[0.82] tracking-[-0.08em]"
              >
                <span className="text-[#2b163d]">AYU</span>
                <span className="relative inline-block text-[#f18b21]">
                  BOOKS
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: [0, 10, -5, 0], y: [0, -5, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 -top-8 text-[2rem] text-[#58c995] sm:-right-12 sm:-top-10 sm:text-[3.5rem]"
                  >
                    ✳
                  </motion.span>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-8 max-w-lg text-sm leading-7 text-[#715f76] sm:text-base"
              >
                Stories for the curious, the restless, and the gloriously hard to categorize.
                Pick a cover. Disappear for a while.
              </motion.p>
              <a href="#library" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#34164c] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-white transition hover:bg-[#f18420] hover:text-[#34164c]">
                Wander the shelves <ArrowDown size={14} />
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 90 }}
              className="relative mx-auto w-full max-w-[28rem] lg:mb-1"
            >
              <div className="absolute -left-7 top-16 z-10 hidden -rotate-12 rounded-[1.7rem] border-4 border-white bg-[#34164c] p-2 shadow-xl sm:block">
                <img src={books[17].posterUrl} alt="" className="h-52 w-36 rounded-[1.15rem] object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -9, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-0 ml-auto w-[72%] rotate-[5deg] rounded-[2rem] border-[8px] border-white bg-[#34164c] p-2 shadow-[0_30px_90px_-32px_rgba(52,22,76,0.5)]"
              >
                <img src={books[2].posterUrl} alt={`Featured book: ${books[2].title}`} className="aspect-[0.72] w-full rounded-[1.4rem] object-cover" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#fff9ed]/90 p-4 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f18420]">On the front table</span>
                  <p className="mt-1 font-serif text-xl font-bold">{books[2].title}</p>
                </div>
              </motion.div>
              <div className="absolute -bottom-5 right-4 z-10 rotate-6 rounded-full bg-[#5ad8a6] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#204832] shadow-lg">
                Your next rabbit hole →
              </div>
            </motion.div>
          </div>
        </section>

        <section id="library" className="relative bg-[#f2eadc] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex flex-col justify-between gap-6 border-b border-[#34164c]/15 pb-7 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#f18420]">The collection / 001—100</p>
                <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.05em] sm:text-5xl">Pick your portal.</h2>
              </div>
              <label className="relative block w-full max-w-sm">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7b89]" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title, author, or mood..."
                  aria-label="Search books"
                  className="w-full rounded-full border border-[#34164c]/20 bg-[#fff9ed] py-3 pl-11 pr-5 text-sm text-[#34164c] outline-none transition placeholder:text-[#9b8c99] focus:border-[#f18420] focus:ring-2 focus:ring-[#f18420]/20"
                />
              </label>
            </div>
            <div className="mb-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setActiveGenre(genre)}
                  aria-pressed={activeGenre === genre}
                  className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition ${
                    activeGenre === genre
                      ? "border-[#34164c] bg-[#34164c] text-[#fff9ed]"
                      : "border-[#34164c]/20 bg-transparent text-[#705977] hover:border-[#f18420] hover:text-[#34164c]"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#8b7b89]">
              <span>{filteredBooks.length} books on this shelf</span>
              <span className="hidden sm:inline">Scroll slowly. Covers have opinions.</span>
            </div>
            {filteredBooks.length ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {filteredBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[#34164c]/25 py-24 text-center font-serif text-2xl text-[#705977]">
                No stories found. Try another doorway.
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
