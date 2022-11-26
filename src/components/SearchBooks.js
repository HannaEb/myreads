import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import * as BooksAPI from "./../api/BooksAPI";
import Book from "./Book";

const SearchBooks = (props) => {
  const { books, onUpdateBook } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (searchTerm) => {
    updateSearchTerm(searchTerm);
    search(searchTerm);
  };

  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Search when user has finished typing
  const search = debounce(async (searchTerm) => {
    if (searchTerm === "") {
      setFoundBooks([]);
      setIsError(false);
      setMessage("");
      return;
    }
    try {
      const foundBooks = await BooksAPI.search(searchTerm.trim());
      if (!foundBooks || foundBooks.error) {
        setFoundBooks([]);
        setIsError(true);
        setMessage("Sorry, no books found");
      } else {
        setFoundBooks(foundBooks);
        setIsError(false);
        setMessage("");
      }
    } catch (err) {
      setFoundBooks([]);
      setIsError(true);
      setMessage("Sorry, something went wrong");
    }
  }, 500);

  // Assign correct shelves to search results
  foundBooks.forEach((foundBook) => {
    let duplicate = books.find((book) => book.id === foundBook.id);
    foundBook.shelf = duplicate ? duplicate.shelf : "none";
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {isError ? (
          <p className="message">{message}</p>
        ) : (
          <ol className="books-grid">
            {foundBooks.map((foundBook) => (
              <li key={foundBook.id}>
                <Book book={foundBook} onUpdateBook={onUpdateBook} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default SearchBooks;
