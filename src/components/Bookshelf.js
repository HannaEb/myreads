import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
  };

  render() {
    const { books, onUpdateBook, shelf } = this.props;

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
  }
}

export default Bookshelf;
