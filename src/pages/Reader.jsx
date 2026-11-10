import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Sun } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BrandLogo } from "../components/SiteChrome";
import { getBookById } from "../data/books";

const passage = [
  "There are places in a book that feel less like sentences and more like doors left gently open. You arrive there without meaning to, following the small rhythm of one line into the next, until the room around you has gone quiet.",
  "The afternoon had turned the windows the color of old honey. Dust moved through the light in slow, private constellations. Somewhere beyond the walls, a city carried on with its errands, its engines, its impatient clocks. Here, the page asked for nothing but attention.",
  "Perhaps that is what a story offers: not an escape from the world, exactly, but a different angle from which to look at it. A name becomes a place. A place becomes a feeling you recognize, though you could not have named it before.",
  "So the reader keeps going. One more paragraph. One more threshold. The ordinary room recedes, and the world of the story grows vivid enough to touch. Even when the words end, something stays behind: a glimmer, a question, a small rearrangement of the heart.",
];

const paragraphs = Array.from({ length: 5 }, (_, repetition) =>
  passage.map((paragraph, index) =>
    repetition === 0 && index === 0
      ? paragraph
      : `${paragraph} ${repetition % 2 ? "Turn the page, and the quiet continues." : "Outside, the light changes by almost nothing."}`,
  ),
).flat();

export default function Reader() {
  const { id } = useParams();
  const book = getBookById(id);
  const [guideY, setGuideY] = useState(null);
  const [fontSize, setFontSize] = useState(20);

  if (!book) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#fff9ed] text-[#34164c]">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-black">No pages here.</h1>
          <Link to="/" className="mt-5 inline-block font-mono text-xs uppercase tracking-widest underline">Return to the shelf</Link>
        </div>
      </div>
    );
  }

  return (
    <main
      onMouseMove={(event) => setGuideY(event.clientY)}
      onMouseLeave={() => setGuideY(null)}
      className="relative min-h-screen overflow-hidden bg-[#fff9ed] text-[#34164c]"
    >
      <div className="pointer-events-none fixed inset-0 opacity-[0.12]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(#34164c 0.55px, transparent 0.55px)", backgroundSize: "7px 7px" }} />
      <AnimatePresence>
        {guideY !== null && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 0.8, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 right-0 z-30 h-px bg-[#f18420] shadow-[0_0_10px_2px_rgba(241,132,32,0.55)]"
            style={{ top: guideY }}
          />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-20 border-b border-[#34164c]/10 bg-[#fff9ed]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <div className="hidden sm:block">
              <p className="font-serif text-sm font-bold">{book.title}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-[#8b7b89]">A quiet place to read</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setFontSize((size) => Math.max(16, size - 2))} aria-label="Decrease text size" className="grid h-9 w-9 place-items-center rounded-full border border-[#34164c]/15 text-[#705977] transition hover:bg-white"><Minus size={14} /></button>
            <button type="button" onClick={() => setFontSize((size) => Math.min(28, size + 2))} aria-label="Increase text size" className="grid h-9 w-9 place-items-center rounded-full border border-[#34164c]/15 text-[#705977] transition hover:bg-white"><Plus size={14} /></button>
            <div className="mx-1 h-5 w-px bg-[#34164c]/15" />
            <Link to={`/book/${book.id}`} aria-label="Back to book details" className="inline-flex h-9 items-center gap-2 rounded-full bg-[#34164c] px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-white transition hover:bg-[#f18420] hover:text-[#34164c]">
              <ArrowLeft size={13} /><span className="hidden sm:inline">Exit reader</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[12rem_minmax(0,44rem)_1fr]">
        <aside className="hidden pt-16 lg:block">
          <div className="sticky top-28 space-y-5 pr-5">
            <BrandLogo />
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8b7b89]"><Sun size={13} className="text-[#f18420]" /> Reading mode</div>
            <div className="h-px bg-[#34164c]/10" />
            <p className="font-serif text-sm italic leading-6 text-[#705977]">“A good book leaves a little light on after you close it.”</p>
          </div>
        </aside>

        <article className="min-h-screen px-6 pb-32 pt-14 sm:px-12 sm:pt-20 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f18420]">{book.genre} / {book.year}</p>
            <h1 className="mt-4 font-serif text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">{book.title}</h1>
            <p className="mt-4 font-serif text-lg italic text-[#806d83]">{book.author}</p>
            <div className="my-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#34164c]/15" />
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#a1929d]">Sample edition</span>
              <span className="h-px flex-1 bg-[#34164c]/15" />
            </div>
            <div className="space-y-7 font-serif leading-[1.95] text-[#493950]" style={{ fontSize }}>
              <p className="mb-9 border-l-2 border-[#5ad8a6] pl-5 font-sans text-sm leading-7 text-[#806d83]">{book.description}</p>
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={`${index}-${book.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className={index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[#f18420]" : ""}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <div className="mt-16 border-t border-[#34164c]/15 pt-7 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8b7b89]">You reached the end of this sample</p>
              <Link to={`/book/${book.id}`} className="mt-4 inline-flex items-center gap-2 font-serif text-lg font-bold text-[#34164c] transition hover:text-[#f18420]">
                Return to the book <ArrowLeft size={16} />
              </Link>
            </div>
          </motion.div>
        </article>
        <div className="hidden lg:block" />
      </div>
    </main>
  );
}
