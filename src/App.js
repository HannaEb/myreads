import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./api/BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import "./App.css";

const BooksApp = () => {
  const [state, setState] = useState({
    books: [],
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await BooksAPI.getAll();
      setState({ books });
    };

    fetchBooks().catch(console.error);
  }, []);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf;
      setState((currentState) => ({
        books: currentState.books
          .filter((currentBook) => currentBook.id !== book.id)
          .concat(book),
      }));
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<ListBooks books={state.books} onUpdateBook={updateBook} />}
        />
        <Route
          path="/search"
          element={
            <SearchBooks books={state.books} onUpdateBook={updateBook} />
          }
        />
      </Routes>
    </div>
  );
};

export default BooksApp;
