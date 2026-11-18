import { ArrowUpRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const logoLinkClass =
  "inline-flex shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--page-accent)]";

export function BrandLogo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="AYUBOOKS home"
      className={`${logoLinkClass} ${className}`}
    >
      <img
        src={logo}
        alt="AYUBOOKS"
        className="h-[5.5rem] w-[5.5rem] object-contain sm:h-[6.25rem] sm:w-[6.25rem]"
      />
    </Link>
  );
}

export function SiteHeader({ showAboutLink = true }) {
  return (
    <header className="relative z-20 border-b border-[color:var(--page-border)] bg-[var(--page-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-[5.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <BrandLogo />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--page-muted)] sm:inline">
            Independent<br />reading club
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--page-muted)] md:flex">
          <Link className="transition-colors hover:text-[var(--page-accent)]" to="/">The shelf</Link>
          {showAboutLink && (
            <a className="transition-colors hover:text-[var(--page-accent)]" href="#about">Our little corner</a>
          )}
        </nav>
        <Link
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--page-ink)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--page-bg)] transition hover:bg-[var(--page-accent)] hover:text-[var(--page-accent-contrast)] sm:px-5"
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
    <footer id="about" className="mt-24 border-t border-[color:var(--page-border)] bg-[var(--page-panel)]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
        <div className="flex items-center gap-3">
          <BrandLogo className="scale-90" />
          <p className="max-w-[13rem] text-left font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-[var(--page-muted)]">
            A small universe for curious readers.
          </p>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--page-muted)]">
          Made for the joy of getting lost in a good book
        </p>
      </div>
    </footer>
  );
}
