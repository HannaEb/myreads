import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import * as BooksAPI from "./../api/BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  state = {
    searchTerm: "",
    foundBooks: [],
    isError: false,
  };

  handleChange = (searchTerm) => {
    this.updateSearchTerm(searchTerm);
    this.search(searchTerm);
  };

  updateSearchTerm = (searchTerm) => {
    this.setState(() => ({
      searchTerm: searchTerm,
    }));
  };

  search = debounce((searchTerm) => {
    if (searchTerm === "") {
      this.setState({
        foundBooks: [],
        isError: false,
      });
    } else {
      BooksAPI.search(searchTerm.trim()).then((foundBooks) => {
        if (!foundBooks || foundBooks.error) {
          this.setState({
            foundBooks: [],
            isError: true,
          });
        } else {
          this.setState({
            foundBooks,
            isError: false,
          });
        }
      });
    }
  }, 500);

  render() {
    const { searchTerm, foundBooks } = this.state;
    const { books, onUpdateBook } = this.props;

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
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.isError ? (
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
  }
}

export default SearchBooks;