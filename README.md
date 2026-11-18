# AYUBOOKS

An animated, editorial-style book library built with React 19, Vite, Tailwind CSS, Framer Motion, React Router, and Lucide icons.

## Routes

- `/` — searchable, genre-filterable library of 100 books
- `/book/:id` — a focused book view themed from the cover image, with its genre palette as a fallback
- `/read/:id` — a paginated, distraction-free reader for titles with a verified public-domain text source

Book metadata and Project Gutenberg text-source references live in `src/data/books.js`. Reader text is fetched on demand from the corresponding GITenberg mirror and paginated in the app. Titles without a verified public-domain source do not expose full text. Cover colors are sampled from Open Library cover images; if the image cannot be sampled, the mapped genre palette is used.

The brand logo is imported from `src/assets/logo.png`.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` to create a production build and `npm run lint` to check the source.
