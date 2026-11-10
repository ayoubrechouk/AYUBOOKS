# AYUBOOKS

An animated, editorial-style book library built with React 19, Vite, Tailwind CSS, Framer Motion, React Router, and Lucide icons.

## Routes

- `/` — searchable, genre-filterable library of 100 books
- `/book/:id` — book details, a downloadable sample description, and related books from the same genre
- `/read/:id` — a distraction-free sample reader with adjustable text size and a mouse-tracking reading guide

Book metadata lives in `src/data/books.js`. Poster images use Unsplash URLs, and the brand logo is served from `public/logo.png`.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` to create a production build and `npm run lint` to check the source.
