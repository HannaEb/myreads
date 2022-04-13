import React, { Component } from "react";
import PropTypes from "prop-types";

class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  render() {
    const { book, onUpdateBook } = this.props;

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
  }
}

export default ShelfChanger;
