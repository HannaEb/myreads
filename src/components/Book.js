import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./ShelfChanger";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  render() {
    const { book, onUpdateBook } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: book.imageLinks
                ? `url(${book.imageLinks.smallThumbnail})`
                : "",
            }}
          ></div>
          <ShelfChanger book={book} onUpdateBook={onUpdateBook} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    );
  }
}

export default Book;
