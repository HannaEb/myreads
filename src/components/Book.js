import React from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./ShelfChanger";

const Book = (props) => {
  const { book, onUpdateBook } = props;

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
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default Book;
