import React from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./api/BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf;
      this.setState((currentState) => ({
        books: currentState.books
          .filter((currentBook) => currentBook.id !== book.id)
          .concat(book),
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ListBooks
                books={this.state.books}
                onUpdateBook={this.updateBook}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchBooks
                books={this.state.books}
                onUpdateBook={this.updateBook}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
