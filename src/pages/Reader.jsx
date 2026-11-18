import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { getBookById } from "../data/books";
import { paginateBookText } from "../utils/bookPages";

export default function Reader() {
  const { id } = useParams();
  const book = getBookById(id);
  const [fontSize, setFontSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [loadState, setLoadState] = useState(() => ({
    bookId: book?.id,
    status: book?.fullText ? "loading" : "unavailable",
    pages: [],
  }));
  const currentState = !book?.fullText
    ? { status: "unavailable", pages: [] }
    : loadState.bookId === book.id
      ? loadState
      : { status: "loading", pages: [] };

  useEffect(() => {
    if (!book?.fullText) {
      return undefined;
    }

    const controller = new AbortController();
    let active = true;

    fetch(book.fullText.url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`The text server returned HTTP ${response.status}.`);
        }
        return response.text();
      })
      .then((text) => {
        const pages = paginateBookText(text);
        if (!pages.length) {
          throw new Error("The selected book has no readable pages.");
        }
        if (active) {
          setPageIndex(0);
          setLoadState({ bookId: book.id, status: "ready", pages });
        }
      })
      .catch((error) => {
        if (active && error.name !== "AbortError") {
          console.error(`Could not load the full text for ${book.title}.`, error);
          setLoadState({ bookId: book.id, status: "error", pages: [], error });
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [book, loadAttempt]);

  if (!book) {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--page-bg)] px-6 text-center text-[var(--page-ink)]">
        <div>
          <h1 className="font-serif text-4xl font-black">Book not found</h1>
          <Link to="/" className="mt-5 inline-block font-mono text-xs uppercase tracking-widest underline">
            Back to the library
          </Link>
        </div>
      </main>
    );
  }

  const canRead = currentState.status === "ready";
  const pages = currentState.pages;
  const pageCount = pages.length;
  const pageText = pages[pageIndex] ?? "";
  const goToPage = (nextIndex) => {
    setPageIndex(Math.max(0, Math.min(nextIndex, pageCount - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const retryLoading = () => {
    setLoadState({ bookId: book.id, status: "loading", pages: [] });
    setLoadAttempt((attempt) => attempt + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-ink)]">
      <header className="sticky top-0 z-20 border-b border-[color:var(--page-border)] bg-[var(--page-bg)]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" aria-label="AYUBOOKS home" className="inline-flex items-center">
            <img src={logo} alt="AYUBOOKS" className="h-12 w-12 object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFontSize((size) => Math.max(16, size - 2))}
              aria-label="Decrease text size"
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--page-border)] text-[var(--page-muted)] transition hover:bg-[var(--page-panel)]"
            >
              <Minus size={14} />
            </button>
            <button
              type="button"
              onClick={() => setFontSize((size) => Math.min(28, size + 2))}
              aria-label="Increase text size"
              className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--page-border)] text-[var(--page-muted)] transition hover:bg-[var(--page-panel)]"
            >
              <Plus size={14} />
            </button>
            <Link
              to={`/book/${book.id}`}
              className="ml-2 inline-flex h-9 items-center gap-2 rounded-full bg-[var(--page-ink)] px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--page-bg)] transition hover:bg-[var(--page-accent)] hover:text-[var(--page-accent-contrast)]"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Book details</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20 pt-10 sm:px-10 sm:pt-14">
        <div className="mb-9 border-b border-[color:var(--page-border)] pb-7 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--page-accent)]">
            {book.genre} / {book.year}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-2 font-serif text-lg italic text-[var(--page-muted)]">{book.author}</p>
        </div>

        {currentState.status === "loading" && (
          <p role="status" className="py-20 text-center font-serif text-lg text-[var(--page-muted)]">
            Loading full text…
          </p>
        )}

        {currentState.status === "unavailable" && (
          <p role="status" className="py-20 text-center font-serif text-lg text-[var(--page-muted)]">
            Full text has not been added for this title.
          </p>
        )}

        {currentState.status === "error" && (
          <div role="alert" className="py-20 text-center">
            <p className="font-serif text-lg text-[var(--page-muted)]">The full text could not be loaded.</p>
            <button
              type="button"
              onClick={retryLoading}
              className="mt-5 rounded-full bg-[var(--page-ink)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--page-bg)] transition hover:bg-[var(--page-accent)] hover:text-[var(--page-accent-contrast)]"
            >
              Try again
            </button>
          </div>
        )}

        {canRead && (
          <>
            <article
              aria-live="polite"
              className="min-h-[55vh] whitespace-pre-line font-serif leading-[1.9] text-[var(--page-ink)]"
              style={{ fontSize }}
            >
              {pageText}
            </article>
            <nav
              aria-label="Book pages"
              className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--page-border)] pt-6"
            >
              <button
                type="button"
                disabled={pageIndex === 0}
                onClick={() => goToPage(pageIndex - 1)}
                className="rounded-full border border-[color:var(--page-border)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.12em] transition hover:bg-[var(--page-panel)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous page
              </button>
              <label className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--page-muted)]">
                <span>Page</span>
                <select
                  aria-label="Select page"
                  value={pageIndex}
                  onChange={(event) => goToPage(Number(event.target.value))}
                  className="rounded-full border border-[color:var(--page-border)] bg-[var(--page-bg)] px-3 py-2 text-[var(--page-ink)]"
                >
                  {pages.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <span>of {pageCount}</span>
              </label>
              <button
                type="button"
                disabled={pageIndex === pageCount - 1}
                onClick={() => goToPage(pageIndex + 1)}
                className="rounded-full bg-[var(--page-ink)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--page-bg)] transition hover:bg-[var(--page-accent)] hover:text-[var(--page-accent-contrast)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next page
              </button>
            </nav>
            <p className="mt-5 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--page-muted)]">
              Text source:{" "}
              <a
                href={book.fullText.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Project Gutenberg
              </a>
            </p>
          </>
        )}
      </main>
    </div>
  );
}
