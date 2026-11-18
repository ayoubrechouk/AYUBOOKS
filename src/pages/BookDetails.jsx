import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "../components/SiteChrome";
import { getBookById } from "../data/books";
import { createCoverTheme, extractDominantCoverColor } from "../utils/coverTheme";

export default function BookDetails() {
  const { id } = useParams();
  const book = getBookById(id);
  const [coverTheme, setCoverTheme] = useState(null);

  useEffect(() => {
    if (!book) {
      return undefined;
    }

    let active = true;
    extractDominantCoverColor(book.posterUrl)
      .then((dominantColor) => {
        if (active) {
          setCoverTheme({
            bookId: book.id,
            theme: createCoverTheme(dominantColor, book.theme),
          });
        }
      })
      .catch((error) => {
        if (active) {
          console.error("Could not extract book-cover colors; using the mapped palette.", error);
          setCoverTheme({ bookId: book.id, theme: book.theme });
        }
      });

    return () => {
      active = false;
    };
  }, [book]);

  if (!book) {
    return <NotFound />;
  }

  const theme = coverTheme?.bookId === book.id ? coverTheme.theme : book.theme;

  return (
    <div
      className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--page-ink)]"
      style={{
        "--page-bg": theme.background,
        "--page-panel": theme.panel,
        "--page-ink": theme.ink,
        "--page-muted": theme.muted,
        "--page-accent": theme.accent,
        "--page-accent-contrast": theme.accentContrast,
        "--page-border": theme.border,
        "--page-shadow": theme.shadow,
      }}
    >
      <SiteHeader showAboutLink={false} />
      <main>
        <div className="mx-auto max-w-[1440px] px-5 pt-7 sm:px-8 lg:px-12">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--page-muted)] transition hover:text-[var(--page-accent)]">
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
            <div className="absolute -inset-4 rotate-6 rounded-[2.4rem] border border-[color:var(--page-border)]" />
            <motion.img
              whileHover={{ rotateY: 7, rotateX: -4, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              src={book.posterUrl}
              alt={`Cover art for ${book.title}`}
              className="relative aspect-[0.72] w-full rounded-[2rem] border-[10px] border-[var(--page-panel)] object-cover shadow-[0_35px_80px_-28px_var(--page-shadow)]"
              style={{ transformStyle: "preserve-3d" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <h1 className="max-w-3xl font-serif text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              {book.title}
            </h1>
            <p className="mt-5 font-serif text-xl italic text-[var(--page-muted)]">by {book.author}</p>
            <div className="my-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-[color:var(--page-border)] py-4 font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--page-muted)]">
              <span>{book.genre}</span><span>{book.year}</span><span>{book.pages} pages</span>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[var(--page-muted)] sm:text-lg">{book.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {book.fullText ? (
                <motion.div whileHover={{ scale: 1.04, rotate: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link to={`/read/${book.id}`} className="inline-flex items-center gap-3 rounded-full bg-[var(--page-ink)] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--page-bg)] shadow-lg transition-colors hover:bg-[var(--page-accent)] hover:text-[var(--page-accent-contrast)]">
                    <BookOpen size={16} /> Read the book
                  </Link>
                </motion.div>
              ) : (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--page-muted)]">
                  Full text unavailable
                </p>
              )}
            </div>
          </motion.div>
        </section>
      </main>
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
