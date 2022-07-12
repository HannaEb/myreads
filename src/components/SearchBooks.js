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

  const handleChange = (searchTerm) => {
    updateSearchTerm(searchTerm);
    search(searchTerm);
  };

  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const search = debounce((searchTerm) => {
    if (searchTerm === "") {
      setFoundBooks([]);
      setIsError(false);
    } else {
      BooksAPI.search(searchTerm.trim()).then((foundBooks) => {
        if (!foundBooks || foundBooks.error) {
          setFoundBooks([]);
          setIsError(true);
        } else {
          setFoundBooks(foundBooks);
          setIsError(false);
        }
      });
    }
  }, 500);

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
        <ol className="books-grid">
          {isError ? (
            <p>Sorry, no books found</p>
          ) : (
            foundBooks.map((foundBook) => (
              <li key={foundBook.id}>
                <Book book={foundBook} onUpdateBook={onUpdateBook} />
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default SearchBooks;
