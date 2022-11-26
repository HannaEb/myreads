import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./api/BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import "./App.css";

const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const newBooks = await BooksAPI.getAll();
      setBooks(newBooks);
      setIsError(false);
      setMessage("");
    };

    fetchBooks().catch((err) => {
      setIsError(true);
      setMessage("Sorry, something went wrong");
    });
  }, []);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;

    setBooks(
      books.filter((currentBook) => currentBook.id !== book.id).concat(book)
    );
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <ListBooks
              books={books}
              onUpdateBook={updateBook}
              isError={isError}
              message={message}
            />
          }
        />
        <Route
          path="/search"
          element={<SearchBooks books={books} onUpdateBook={updateBook} />}
        />
      </Routes>
    </div>
  );
};

export default BooksApp;
