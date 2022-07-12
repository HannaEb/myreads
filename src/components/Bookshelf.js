import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = (props) => {
  const { books, onUpdateBook, shelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired,
};

export default Bookshelf;
