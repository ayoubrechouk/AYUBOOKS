import { createSelector, createSlice } from "@reduxjs/toolkit";
import { MOCK_BOOKS } from "./mocBooks.js";

const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem("ayubooks_favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("Could not load favorites from localStorage", error);
    return [];
  }
};

const initialState = {
  books: MOCK_BOOKS,
  selectedBook: null,
  searchQuery: "",
  activeGenre: "All",
  favorites: loadFavorites(),
  isPDFReaderOpen: false,
  status: "idle",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
      state.isPDFReaderOpen = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload;
    },
    toggleFavorite: (state, action) => {
      const bookId = action.payload;

      if (state.favorites.includes(bookId)) {
        state.favorites = state.favorites.filter((id) => id !== bookId);
      } else {
        state.favorites.push(bookId);
      }

      try {
        localStorage.setItem(
          "ayubooks_favorites",
          JSON.stringify(state.favorites),
        );
      } catch (error) {
        console.error("Could not save favorites", error);
      }
    },
    setPDFReaderOpen: (state, action) => {
      state.isPDFReaderOpen = action.payload;
    },
  },
});

export const {
  selectBook,
  clearSelectedBook,
  setSearchQuery,
  setActiveGenre,
  toggleFavorite,
  setPDFReaderOpen,
} = booksSlice.actions;

export const selectAllBooks = (state) => state.books.books;
export const selectActiveBook = (state) => state.books.selectedBook;
export const selectFavorites = (state) => state.books.favorites;
export const selectSearchQuery = (state) => state.books.searchQuery;
export const selectActiveGenre = (state) => state.books.activeGenre;
export const selectIsPDFReaderOpen = (state) => state.books.isPDFReaderOpen;

export const selectFilteredBooks = createSelector(
  [selectAllBooks, selectSearchQuery, selectActiveGenre],
  (books, searchQuery, activeGenre) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.writer.toLowerCase().includes(normalizedQuery);
      const matchesGenre = activeGenre === "All" || book.genre === activeGenre;

      return matchesSearch && matchesGenre;
    });
  },
);

export default booksSlice.reducer;
