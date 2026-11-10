import { ArrowUpRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const logoLinkClass =
  "inline-flex shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8c26]";

export function BrandLogo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="AYUBOOKS home"
      className={`${logoLinkClass} ${className}`}
    >
      <img
        src="/logo.png"
        alt="AYUBOOKS"
        className="h-14 w-14 rounded-full object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[#442950]/10 bg-[#fff9ed]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[5.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <BrandLogo />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[#51375a] sm:inline">
            Independent<br />reading club
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#51375a] md:flex">
          <Link className="transition-colors hover:text-[#f18420]" to="/">The shelf</Link>
          <a className="transition-colors hover:text-[#f18420]" href="#about">Our little corner</a>
        </nav>
        <Link
          className="group inline-flex items-center gap-2 rounded-full bg-[#34164c] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#fff5dc] transition hover:bg-[#f18420] hover:text-[#281337] sm:px-5"
          to="/#library"
        >
          <span className="hidden sm:inline">Find a book</span>
          <span className="sm:hidden"><Menu size={15} /></span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="about" className="mt-24 border-t border-[#442950]/15 bg-[#f7efdf]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
        <div className="flex items-center gap-3">
          <BrandLogo className="scale-90" />
          <p className="max-w-[13rem] text-left font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-[#6d5a70]">
            A small universe for curious readers.
          </p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#8b7b89]">
          Made for the joy of getting lost in a good book
        </p>
      </div>
    </footer>
  );
}
