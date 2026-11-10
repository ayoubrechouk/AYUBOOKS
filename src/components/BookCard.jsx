import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookCard({ book, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.045, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -9, rotate: index % 2 ? 1.5 : -1.5, scale: 1.025 }}
      className="group"
    >
      <Link
        to={`/book/${book.id}`}
        aria-label={`View ${book.title} by ${book.author}`}
        className="block rounded-[1.35rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f18420]"
      >
        <div className="relative aspect-[0.72] overflow-hidden rounded-[1.25rem] border-[5px] border-white bg-[#ead8b9] shadow-[0_16px_38px_-18px_rgba(52,22,76,0.42)] transition-shadow duration-500 group-hover:shadow-[0_22px_48px_-18px_rgba(52,22,76,0.55)]">
          <img
            src={book.posterUrl}
            alt={`Cover art for ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1027]/90 via-[#1c1027]/5 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95" />
          <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-[#fff9ed]/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-[#34164c] backdrop-blur-md">
            {book.genre}
          </span>
          <div className="absolute inset-x-4 bottom-4 text-[#fff9ed]">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#ffd178]">
              {book.year}
            </p>
            <h2 className="line-clamp-2 font-serif text-lg font-bold leading-[1.05] sm:text-xl">
              {book.title}
            </h2>
            <div className="mt-3 flex items-center justify-between border-t border-white/25 pt-2.5">
              <span className="line-clamp-1 text-[10px] text-white/75">{book.author}</span>
              <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
