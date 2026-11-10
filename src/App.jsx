import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import Reader from "./pages/Reader";

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/read/:id" element={<Reader />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fff9ed] px-6 text-center text-[#34164c]">
      <div>
        <h1 className="font-serif text-5xl font-black">Lost between the pages?</h1>
        <p className="mt-4 text-[#705977]">That corner of the library does not exist.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-[#34164c] px-6 py-3 font-mono text-xs uppercase tracking-widest text-white">Go home</Link>
      </div>
    </main>
  );
}