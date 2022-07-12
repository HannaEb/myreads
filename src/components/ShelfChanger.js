import React from "react";
import PropTypes from "prop-types";

const ShelfChanger = (props) => {
  const { book, onUpdateBook } = props;

  return (
    <div className="book-shelf-changer">
      <select
        value={book.shelf}
        onChange={(event) => onUpdateBook(book, event.target.value)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default ShelfChanger;
